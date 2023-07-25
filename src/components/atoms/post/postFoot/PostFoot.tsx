import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../button/Button";
import { faNoteSticky, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Post from "@src/entity/Post";

interface IPostFootProps {
    post: Post;
}

export default function PostFoot({post}: IPostFootProps) {
    const { hasLike } = post;
    console.log(hasLike);
    

    return (
        <div className="w-full rounded-md flex h-12 overflow-hidden divide-x divide-cnt-dark items-center bg-button-color">
            <Button onClick={() => { }} className="w-24 shadow-none">Perguntas</Button>
            <Button onClick={() => { }} className="w-24 shadow-none px-4">Discussão</Button>
            <div className="flex ml-20">
                <Button onClick={() => { }} disabled={hasLike} className="w-24 shadow-none p-0 m-0">
                    <FontAwesomeIcon size="xl" icon={hasLike ? faHeartSolid : faHeartRegular}></FontAwesomeIcon>
                </Button>
                <Button onClick={() => { }} className="w-24 shadow-none p-0 m-0">
                    <FontAwesomeIcon size="xl" icon={faNoteSticky}></FontAwesomeIcon>
                </Button>
            </div>
        </div>
    )
}