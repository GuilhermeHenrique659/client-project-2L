import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Cover from "@src/components/atoms/community/Cover";
import Gallery from "@src/components/atoms/gallery/Gallery";
import Loading from "@src/components/atoms/loading/Loading";
import Community from "@src/entity/Community"
import communityRepository from "@src/repository/community/CommunityRepository"
import { useEffect, useState } from "react"


export default function CommunityForm() {
    const [community, setCommunity] = useState<Community>();
    const [loading, setLoading] = useState(true);



    return (
        <div className="flex flex-col w-full p-4 border-b">
            <Cover ></Cover>
            <div className="flex justify-between">
                <div className="flex flex-col justify-start p-4">
                    <div className="flex items-center">
                        <AvatarApp avatar='' size="64"></AvatarApp>
                        <h4 className="px-4"></h4>
                    </div>
                    <h5 className="p-4"></h5>
                </div>
            </div>
            <div className="bg-input-bg h-20 overflow-y-auto scroll-p-px w-96 rounded-md z-10 p-3">
                Tags:
            </div>
        </div>
    )
}