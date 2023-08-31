'use client'

import Loading from "@src/components/atoms/loading/Loading";
import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import CommunityForm from "@src/components/molecules/community/CommunityForm";
import Navbar from "@src/components/molecules/navbar/Navbar";
import CommunityList from "@src/components/organism/community/CommunityList";
import Community from "@src/entity/Community";
import Post from "@src/entity/Post";
import userRepository from "@src/repository/user/UserRepository";
import { useEffect, useState } from "react";

export default function Page() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        userRepository.getFollowingCommunity().then((value) => {
            setCommunities(value);
            setLoading(false)
        })
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className="flex justify-center mt-10 ">
                <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
                    <FeedBar></FeedBar>
                    <TooBar setData={setCommunities}><CommunityForm setShowForm={() => null} setData={setCommunities}></CommunityForm></TooBar>
                    <h3 className="border-b w-full flex justify-center">Communidades seguindo</h3>
                    <div className="w-3/5 p-4 max-md:w-full max-md:p-1">
                        {loading ? <Loading></Loading> : <CommunityList communities={communities}></CommunityList>}
                    </div>
                </div>
            </div>
        </>
    )
}