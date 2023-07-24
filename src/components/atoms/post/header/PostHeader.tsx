import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarApp from "../../avatar/AvatarApp";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";


export default function PostHeader(){
    return (
        <div className="h-16 flex flex-row justify-between">
            <div className="flex items-center">
                <AvatarApp avatar="User Name" size="64"></AvatarApp>
                <h4 className="p-6">User Name</h4>
            </div>
            <div>
            <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faTrash}></FontAwesomeIcon></a>
            <a className="p-4" href=""><FontAwesomeIcon size="xl" icon={faPenToSquare}></FontAwesomeIcon></a>

            </div>
        </div>
    )
}