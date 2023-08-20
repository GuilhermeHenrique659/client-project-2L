import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppError from "@src/common/errors/AppError";
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Button from "@src/components/atoms/button/Button";
import Cover from "@src/components/atoms/community/Cover";
import Loading from "@src/components/atoms/loading/Loading";
import Community from "@src/entity/Community"
import Tag from "@src/entity/Tag";
import communityRepository from "@src/repository/community/CommunityRepository"
import userRepository from "@src/repository/user/UserRepository";
import { Dispatch, useEffect, useState } from "react"

interface ICommunityProfileProps {
    communityId: string;
    setTags: Dispatch<Tag[]>
}

export default function CommunityProfile({ communityId, setTags }: ICommunityProfileProps) {
    const [community, setCommunity] = useState<Community>();
    const [error, setError] = useState<AppError>();
    const [loading, setLoading] = useState(true);

    const handleFollowCommunity =async () => {
        setLoading(true);
        await userRepository.followCommunity(communityId, setError);
        if(community){
            community.hasFollowing = true;
        }
        setLoading(false);
    }


    useEffect(() => {
        communityRepository.getCommunityData(communityId).then((value) => {            
            setCommunity(value);
            setLoading(false);            
            setTags(value.tags);
        })
    }, []);

    return (
        <div className="flex flex-col w-full mb-4 border-b">
            <Cover cover={community?.cover}></Cover>
            <div className="flex justify-between max-md:flex-col">
                <div className="flex flex-col justify-start p-4">
                    <div className="flex items-center">
                        <AvatarApp avatar={community?.avatar?.filename ?? community?.name} size="64"></AvatarApp>
                        <h3 className="px-4">{community?.name}</h3>
                        <Button className="w-36 h-7 rounded-full p-0 m-2 " disabled={community?.hasFollowing} onClick={handleFollowCommunity}>
                            {community?.hasFollowing ? 'Seguindo' : 'Seguir'} <FontAwesomeIcon icon={community?.hasFollowing ? faHeartSolid : faHeartRegular}></FontAwesomeIcon>
                        </Button>
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
            <div className="bg-input-bg h-20 overflow-y-auto scroll-p-px rounded-md z-10 p-4">
                {community?.tags.map((tag) => `#${tag.description}`)}
            </div>
            {loading && <Loading></Loading>}
        </div>
    )
}