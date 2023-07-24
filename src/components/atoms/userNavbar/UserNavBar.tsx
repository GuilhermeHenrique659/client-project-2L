import User from "@src/entity/User";
import AvatarApp from "../avatar/AvatarApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";

interface IUserNavbarProps {
    user: User
}

export default function UserNavBar({ user }: IUserNavbarProps) {
    return (
        <div className="flex items-center max-md:mt-4">
            <div className="max-md:flex max-md:flex-row-reverse md:flex flex-row">
            <h4 className="p-4">{user.name}</h4>
            <AvatarApp avatar={user.avatar} size="64"></AvatarApp>
            </div>
            <div className="mx-10 max-md:mx-2 max-md:items-end">
                <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faGear}></FontAwesomeIcon></a>
                <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faSignOut}></FontAwesomeIcon></a>
            </div>
        </div>
    )
}