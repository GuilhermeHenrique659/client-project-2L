import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import Posts from "../posts/Posts";
import Post from "@src/entity/Post";
import { useState } from "react";
import PostForm from "@src/components/molecules/post/PostForm";



export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
            <FeedBar></FeedBar>
            <TooBar setData={setPosts}>
                <PostForm setData={setPosts} setShowForm={() => { return }}></PostForm>
            </TooBar>
            <Posts posts={posts} setPosts={setPosts}></Posts>
        </div>
    )
}