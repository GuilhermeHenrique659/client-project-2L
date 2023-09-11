
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import PostComponent from "@src/components/molecules/post/Post"
import Post from "@src/entity/Post"
import postRepository from "@src/repository/post/PostRepository";
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IPostProps {
    posts: Post[],
    setPosts: Dispatch<SetStateAction<Post[]>>
}

export default function Posts({ posts, setPosts }: IPostProps) {
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [emptyPosts, setEmptyPosts] = useState(false);

    const handleLoadingMore = async () => {
        setPage((currentPage) => currentPage + 1);
        setLoading(true);
        const morePosts = await postRepository.getList(page + 1);
        if (morePosts && morePosts.length > 0) {
            setPosts((currentPost) => [...currentPost, ...morePosts])
        } else {
            setEmptyPosts(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        postRepository.getList(0).then((value) => {
            if (value) {
                setPosts(value);
                setLoading(false);
            }
        });
    }, [])

    return (
        <div className="flex flex-col w-11/12 items-center justify-around z-0">
            {posts && posts.map((post) => <PostComponent key={post.id} post={post}></PostComponent>)}
            {loading && <Loading></Loading>}
            <Button onClick={handleLoadingMore} disabled={emptyPosts} className="w-64 h-8 items-center">Carregar mais</Button>
        </div>
    )
}