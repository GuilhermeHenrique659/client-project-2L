import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarApp from "../../avatar/AvatarApp";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import User from "@src/entity/User";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";

interface IPostHeader {
    user: User
}

export default function PostHeader({ user }: IPostHeader) {
    const currentUser = LocalStorageHelpers.get<CreateUserResponse>('user')

    return (
        <div className="h-16 flex flex-row justify-between">
            <div className="flex items-center">
                <AvatarApp user={user} size="64"></AvatarApp>
                <h4 className="p-6 max-md:text-sm">{user.name}</h4>
            </div>
            {(currentUser && currentUser.user.id === user.id) &&
                <div>
                    <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faTrash}></FontAwesomeIcon></a>
                    <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faPenToSquare}></FontAwesomeIcon></a>
                </div>
            }
        </div>
    )
}