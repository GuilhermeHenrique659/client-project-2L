'use client'
import Navbar from "@src/components/molecules/navbar/Navbar";
import Feed from "@src/components/organism/feed/Feed";
import Post from "@src/entity/Post";
import { useState } from "react";


export default function Index() {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <>
            <Navbar setPosts={setPosts}></Navbar>
            <div className="flex justify-center mt-10 ">
                <Feed posts={posts} setPosts={setPosts}></Feed>
            </div>
        </>
    )
}