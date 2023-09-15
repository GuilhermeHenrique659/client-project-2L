import AvatarApp from "@src/components/atoms/avatar/AvatarApp"
import Loading from "@src/components/atoms/loading/Loading";
import User from "@src/entity/User"
import userSocketRepository from "@src/events/user/UserSocketRepository";
import { IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import userRepository from "@src/repository/user/UserRepository";
import { useEffect, useState } from "react"

export default function FeedBar() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        userRepository.getFollowersUsers().then((value) => {
            setUsers(value);
        })
    }, [])

    return (<>
        {loading ? <Loading></Loading> : <div className="w-96 h-24 border-b mb-10 overflow-x-auto whitespace-nowrap">
            {users.map((user, index) => {
                return <div key={index} className="m-2 p-1">
                    <AvatarApp user={user} size="64" className={user.isOnline ? "border-2 border-yellow-500" : ""}></AvatarApp>
                </div>
            })}
        </div>}
    </>
    )
}