'user client'

import AvatarApp from "../avatar/AvatarApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { useRouter } from "next/navigation";
import { deleteCookie } from 'cookies-next';
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";

interface IUserNavbarProps {
    data: CreateUserResponse
}

export default function UserNavBar({ data }: IUserNavbarProps) {
    const router = useRouter();

    const handleLogout = () => {
        LocalStorageHelpers.delete('user');
        deleteCookie('token');
        router.push('/login');
    }

    return (
        <div className="flex items-center max-md:mt-4">
            <div className="max-md:flex max-md:flex-row-reverse md:flex flex-row">
            <h4 className="p-4">{data.user.name}</h4>
            <AvatarApp avatar={data.user.avatar} size="64"></AvatarApp>
            </div>
            <div className="mx-10 max-md:mx-2 max-md:items-end">
                <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faGear}></FontAwesomeIcon></a>
                <a className="p-4" href="" onClick={handleLogout}><FontAwesomeIcon size="xl" icon={faSignOut}></FontAwesomeIcon></a>
            </div>
        </div>
    )
}