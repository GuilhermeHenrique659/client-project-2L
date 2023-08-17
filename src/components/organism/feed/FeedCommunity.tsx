import Post from "@src/entity/Post";
import { useState } from "react";
import PostsCommuntiy from "../posts/PostsCommunity";
import CommunityProfile from "@src/components/molecules/community/CommunityProfile";
import CommunityUsers from "@src/components/molecules/community/CommunityUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "@src/components/atoms/button/Button";

interface IFeedCommunity {
    communityId: string
}

function SideBar({ communityId }: IFeedCommunity){
    return (
        <div className="z-100 flex w-72 p-2">     
            <CommunityUsers communityId={communityId}></CommunityUsers>
        </div>
    )
}

export default function Feed({ communityId }: IFeedCommunity) {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
            <CommunityProfile communityId={communityId}></CommunityProfile>
            <div className="p-4 w-full">
                 <SideBar communityId={communityId}></SideBar>
            </div>
            <PostsCommuntiy posts={posts} communityId={communityId} setPosts={setPosts}></PostsCommuntiy>
        </div>
    )
}