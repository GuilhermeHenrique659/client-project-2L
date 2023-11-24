import Posts from "../posts/Posts";
import Post from "@src/entity/Post";
import { Dispatch, SetStateAction } from "react";



export default function Feed({ posts, setPosts }: { posts: Post[], setPosts: Dispatch<SetStateAction<Post[]>> }) {

    return (
        <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-white flex flex-col items-center justify-center ">
            {/* <TooBar setData={setPosts}>
                <PostForm setData={setPosts} setShowForm={() => { return }}></PostForm>
            </TooBar> */}
            <Posts posts={posts} setPosts={setPosts}></Posts>
        </div>
    )
}