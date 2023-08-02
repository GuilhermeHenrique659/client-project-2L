import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Loading from "@src/components/atoms/loading/Loading";
import User from "@src/entity/User"
import communitySocketRepository from "@src/events/community/CommunitySocketRepository";
import { useEffect, useState } from "react"

interface ICommunityUsersProps {
    communityId: string
}

export default function CommunityUsers({ communityId }: ICommunityUsersProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        communitySocketRepository.getUsers(communityId).then((value) => {
            setUsers(value);
            setLoading(false);
        })
    }, [])
    
    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="flex items-center">
                        <AvatarApp user={user} size="48"></AvatarApp>
                        <h5 className="px-4">{user.name}</h5>
                    </div>
                )
            })}
            {loading && <Loading></Loading>}
        </div>
    )
}