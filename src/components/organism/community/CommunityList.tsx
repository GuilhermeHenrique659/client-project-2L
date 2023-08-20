import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Button from "@src/components/atoms/button/Button";
import Community from "@src/entity/Community";
import { useRouter } from "next/navigation";

export default function CommunityList(props: { communities: Community[] }) {
    const router = useRouter();

    const handleClickCommuntiy = (communityId?: string) => {
        const params = new URLSearchParams({ 'communityId': communityId as string })
        
        console.log(router);
        
        router.push(`/community?${params.toString()}`)
    }

    return (
        <div>
            {props.communities.map((community, index) => {
                return (
                    <div className="flex justify-between items-center p-4" key={index}>
                        <div className="flex items-center">
                            <AvatarApp avatar={community?.avatar?.filename ?? community?.name} size="64"></AvatarApp>
                            <h3 className="px-4">{community?.name}</h3>
                        </div>
                        <Button className="w-36 h-7 rounded-full p-0 m-2 " onClick={() => handleClickCommuntiy(community.id)}>
                           Entrar <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                        </Button>
                    </div>
                );
            })}
        </div>
    )
}