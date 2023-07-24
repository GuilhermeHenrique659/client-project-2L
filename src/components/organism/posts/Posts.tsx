
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import PostComponent from "@src/components/molecules/post/Post"
import Post from "@src/entity/Post"
import postRepository from "@src/repository/post/PostRepository";
import { useEffect, useState } from "react"


export default function Posts(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const handleLoadingMore = async () => {
        const currentPage = page;
        setPage(currentPage + 1);
        setLoading(true);
        const morePosts = await postRepository.getList(page);
        if(morePosts){
            setPosts((currentPost) => [...currentPost, ...morePosts])
        }
        setLoading(false);
    }

    useEffect(() => {
        postRepository.getList(0).then((value) => {
            if(value){
                setPosts(value);
                setLoading(false);
            }
        });
    }, [])
    
    return (
        <div className="flex flex-col w-11/12 items-center justify-around z-0">
            {posts && posts.map((post) => <PostComponent key={post.id} post={post}></PostComponent>) }
            {loading && <Loading></Loading>}
            <Button onClick={handleLoadingMore} className="w-64 h-8 items-center">Carregar mais</Button>
        </div>
    )
}