import Community from "@src/entity/Community";
import AvatarApp from "../../avatar/AvatarApp";
import Button from "../../button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface IPostHeaderCommunityProps {
    community: Community
}

export default function PostHeaderCommunity({ community }: IPostHeaderCommunityProps) {
    const router = useRouter();
    const searchParams = useSearchParams()!

    const handleClickCommuntiy = () => {
        const params = new URLSearchParams({'communityId': community.id as string})

        router.push(`community?${params.toString()}`)
    }

    return (
        <div className="py-2">
            <Button className="h-8 flex flex-row shadow-lg p-6" onClick={handleClickCommuntiy}>
                <div className="flex items-center text-slate-800">
                    <AvatarApp avatar={community.avatar?.filename ?? community.name} size="32"></AvatarApp>
                    <h4 className="p-6">{community.name}</h4>
                </div>
            </Button>
        </div>
    )
}