import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Cover from "@src/components/atoms/community/Cover";
import Gallery from "@src/components/atoms/gallery/Gallery";
import Loading from "@src/components/atoms/loading/Loading";
import Community from "@src/entity/Community"
import communityRepository from "@src/repository/community/CommunityRepository"
import { useEffect, useState } from "react"

interface ICommunityProfileProps {
    communityId: string;
}

export default function CommunityProfile({ communityId }: ICommunityProfileProps) {
    const [community, setCommunity] = useState<Community>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        communityRepository.getCommunityData(communityId).then((value) => {
            setCommunity(value);
            setLoading(false);
        })
    }, []);    

    return (
        <div className="flex flex-col w-full p-14 border-b">
            <Cover cover={community?.cover}></Cover>
            <div className="flex justify-between">
                <div className="flex flex-col justify-start p-4">
                    <div className="flex items-center">
                        <AvatarApp avatar={community?.avatar?.filename ?? community?.name} size="64"></AvatarApp>
                        <h4 className="px-4">{community?.name}</h4>
                    </div>
                    <h5 className="p-4">{community?.description}</h5>
                </div>
                <div>
                <h5 className="p-4">Admin:</h5>
                <div className="flex items-center p-4">
                        <AvatarApp user={community?.admin} size="48"></AvatarApp>
                        <h4 className="px-4">{community?.admin.name}</h4>
                    </div>
                </div>
            </div>
            <div className="bg-input-bg h-20 overflow-y-auto scroll-p-px w-96 rounded-md z-10 p-3">
                Tags:
                {community?.tags.map((tag) => `#${tag.description}`)}
            </div>
            {loading && <Loading></Loading>}
        </div>
    )
}