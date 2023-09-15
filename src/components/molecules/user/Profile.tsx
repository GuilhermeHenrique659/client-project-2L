import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Button from "@src/components/atoms/button/Button";
import User from "@src/entity/User";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import userRepository from "@src/repository/user/UserRepository";
import { use, useState } from "react";
import AppError from "@src/common/errors/AppError";
import Loading from "@src/components/atoms/loading/Loading";

interface IUserProfileProps {
    user: User;
    currentUserId: string
}

export default function Profile({ user, currentUserId }: IUserProfileProps) {
    const [error, setError] = useState<AppError>();
    const [loading, setLoading] = useState(false);

    const handleFollowUser = async () => {
        setLoading(true);
        await userRepository.followUser(user.id as string, setError);
        if (user) {
            user.hasFollowing = true;
        }
        setLoading(false);
    }

    const handleUnfollowUser = async () => {
        setLoading(true);
        await userRepository.unfollowUser(user.id as string, setError);
        if (user) {
            user.hasFollowing = false;
        }
        setLoading(false);
    }

    return (
        <div className="p-6 m-10 flex flex-col max-md:items-center">

            <div className="flex max-md:flex-col max-md:items-center">
                <div className="flex max-md:flex-col items-center p-4 m-4">
                    <AvatarApp user={user} size="128"></AvatarApp>
                    <h2 className="text-lg md:px-10 max-md:p-2">Nome: {user.name}</h2>
                </div>
                {user.tags && <div className="p-4">
                    <p className="text-md m-4">Interesses</p>
                    <div className="flex flex-col">
                        <div className="bg-input-bg h-20 p-2 w-full overflow-y-auto scroll-p-px rounded-md">
                            {user.tags.length > 0 ? user.tags?.map(tag => ` #${tag.description}`) : <>
                                <h4>Nada de interessante </h4>
                            </>
                            }
                        </div>
                    </div>
                </div>
                }
                {currentUserId !== user.id && <div>
                    {loading ? <Loading></Loading> :
                        <Button className="w-36 h-7 rounded-full p-0 m-2 " onClick={user?.hasFollowing ? handleUnfollowUser : handleFollowUser}>
                            {user?.hasFollowing ? 'Seguindo' : 'Seguir'} <FontAwesomeIcon icon={user?.hasFollowing ? faHeartSolid : faHeartRegular}></FontAwesomeIcon>
                        </Button>}
                </div>}
            </div>
        </div>
    )
}