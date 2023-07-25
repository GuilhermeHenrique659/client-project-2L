import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import Posts from "../posts/Posts";
import Post from "@src/entity/Post";
import { useState } from "react";



export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);


    return (
        <div className="w-3/4 h-fit max-md:w-full max-md:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
            <FeedBar></FeedBar>
            <TooBar setPosts={setPosts}></TooBar>
            <Posts posts={posts} setPosts={setPosts}></Posts>
        </div>
    )
}