'use client'

import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import CommunityForm from "@src/components/molecules/community/CommunityForm";
import Navbar from "@src/components/molecules/navbar/Navbar";
import Community from "@src/entity/Community";
import Post from "@src/entity/Post";
import { useState } from "react";

export default function Page() {
    const [community, setcommunity] = useState<Community>();

    return (
        <>
            <Navbar></Navbar>
            <div className="flex justify-center mt-10 ">
                <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
                    <FeedBar></FeedBar>
                    <TooBar setData={setcommunity}><CommunityForm></CommunityForm></TooBar>
                </div>
            </div>
        </>
    )
}