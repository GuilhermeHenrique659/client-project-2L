import User from "@src/entity/User";
import AvatarApp from "../avatar/AvatarApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";

interface IUserNavbarProps {
    user: User
}

export default function UserNavBar({ user }: IUserNavbarProps) {
    return (
        <div className="flex items-center max-sm:mt-4">
            <div className="max-sm:flex max-sm:flex-row-reverse md:flex flex-row">
            <h4 className="p-4">{user.name}</h4>
            <AvatarApp avatar={user.avatar} size="64"></AvatarApp>
            </div>
            <div className="mx-10 max-sm:mx-2 max-sm:items-end">
                <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faGear}></FontAwesomeIcon></a>
                <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faSignOut}></FontAwesomeIcon></a>
            </div>
        </div>
    )
}