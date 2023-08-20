import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Loading from "@src/components/atoms/loading/Loading";
import User from "@src/entity/User"
import communitySocketRepository from "@src/events/community/CommunitySocketRepository";
import userSocketRepository from "@src/events/user/UserSocketRepository";
import { IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
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
    }, []);

    const handleUserOut = async ({ data }: IServerResponseSuccess<string>) => {
        setUsers((currentUsers) => {
            return currentUsers.map((user) => {
                if (user.id === data) {
                    user.isOnline = false;
                }
                return user;
            });
        })
    }

    userSocketRepository.socket.addListern('user/out', handleUserOut);

    const handleUserEnter = async ({ data }: IServerResponseSuccess<string>) => {
        setUsers((currentUsers) => {
            return currentUsers.map((user) => {
                if (user.id === data) {
                    user.isOnline = true;
                }
                return user;
            });
        })
    }

    userSocketRepository.socket.addListern('user/enter', handleUserEnter);

    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="flex p-2 items-center">
                        <AvatarApp user={user} size="48"></AvatarApp>
                        <h5 className="px-4">{user.name}</h5>
                        <div className={`h-3 w-3 rounded-xl ${user.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                )
            })}
            {loading && <Loading></Loading>}
        </div>
    )
}