import Post from "@src/entity/Post";
import { useState } from "react";
import PostsCommuntiy from "../posts/PostsCommunity";
import CommunityProfile from "@src/components/molecules/community/CommunityProfile";
import CommunityUsers from "@src/components/molecules/community/CommunityUsers";

import Tag from "@src/entity/Tag";
import PostFormCommunity from "@src/components/molecules/post/PostFormCommunity";

interface IFeedCommunity {
    communityId: string
}

function SideBar({ communityId }: IFeedCommunity) {

    return (
        <div id="default-sidebar" className="" aria-label="Sidebar">
            <div className="h-fit w-fit px-3 py-4 overflow-y-auto">
                <div className="z-100 flex w-72 p-2">
                    <CommunityUsers communityId={communityId}></CommunityUsers>
                </div>
            </div>
        </div>
    )
}

export default function Feed({ communityId }: IFeedCommunity) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className="w-3/4 max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
            <CommunityProfile setTags={setTags} communityId={communityId}></CommunityProfile>
            <div className="bg-fixed w-full h-fit max-md:flex-col">
                <SideBar communityId={communityId}></SideBar>
                <div className="flex flex-col shadow-xl border border-slate-500 rounded-md p-2">
                    <PostFormCommunity tags={tags} setTags={setTags} communityId={communityId}></PostFormCommunity>
                </div>
            </div>
            <PostsCommuntiy posts={posts} communityId={communityId} setPosts={setPosts}></PostsCommuntiy>
        </div>
    )
}