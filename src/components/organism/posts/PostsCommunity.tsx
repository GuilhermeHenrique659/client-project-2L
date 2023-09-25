
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import PostComponent from "@src/components/molecules/post/Post"
import Post from "@src/entity/Post"
import { postSocketRepository } from "@src/events/post/PostSocketRepository";
import { IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IPostProps {
    posts: Post[],
    communityId: string;
    setPosts: Dispatch<SetStateAction<Post[]>>
}

export default function PostsCommuntiy({ posts, setPosts, communityId }: IPostProps) {
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [emptyPosts, setEmptyPosts] = useState(false);

    const handleLoadingMore = async () => {
        setPage((currentPage) => currentPage + 1);
        setLoading(true);
        const morePosts = await postSocketRepository.communityPosts(page + 1, communityId);
        if (morePosts && morePosts.length > 0) {
            setPosts((currentPost) => [...currentPost, ...morePosts])
        } else {
            setEmptyPosts(true);
        }
        setLoading(false);
    }

    const handleAddPost = async ({ data }: IServerResponseSuccess<Post>) => {
        const { community, ...post } = data;
        setPosts((currentPosts) => [post, ...currentPosts])
    }

    postSocketRepository.socket.addListern('post/added', handleAddPost);

    useEffect(() => {
        postSocketRepository.communityPosts(0, communityId).then((value) => {
            if (value) {
                setPosts(value);
                setLoading(false);
            }
        });
    }, [])

    return (
        <div className="flex flex-col-reverse w-11/12 max-md:w-full items-center justify-around z-0">
            {posts && posts.map((post) => <PostComponent key={post.id} post={post} setPosts={setPosts}></PostComponent>)}
            {loading && <Loading></Loading>}
            <Button onClick={handleLoadingMore} disabled={emptyPosts} className="w-64 h-8 items-center">Carregar mais</Button>
        </div>
    )
}