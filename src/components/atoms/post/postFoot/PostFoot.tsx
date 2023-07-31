import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../button/Button";
import { faNoteSticky, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Post from "@src/entity/Post";
import { useState } from "react";
import postRepository from "@src/repository/post/PostRepository";
import AppError from "@src/common/errors/AppError";
import InputShowError from "../../input/InputError";

interface IPostFootProps {
    post: Post;
}

export default function PostFoot({post}: IPostFootProps) {
    const [likeCount, setLikeCount] = useState<number>(post.likeCount);
    const [error, setError] = useState<AppError>();
    const [hasLike, setHasLike] = useState<boolean>(post.hasLike)

    const handleAddLike = async (postId: string) => {
        await postRepository.like(postId, setError);
        setHasLike(true);
        setLikeCount(previous => previous + 1);
    }

    return (
        <div className="w-full rounded-md flex h-12 overflow-hidden divide-x divide-cnt-dark items-center bg-button-color">
            <Button onClick={() => { }} className="w-24 shadow-none">Perguntas</Button>
            <Button onClick={() => { }} className="w-24 shadow-none px-4">Discussão</Button>
            <div className="flex items-center ml-20">
                <Button onClick={() => handleAddLike(post.id as string)} disabled={hasLike} className="w-24 shadow-none flex p-4 m-0">
                    <h6 className="p-4">{likeCount}</h6>
                    <FontAwesomeIcon size="xl" icon={hasLike ? faHeartSolid : faHeartRegular}></FontAwesomeIcon>
                   {error && <InputShowError>{error?.message}</InputShowError>}
                </Button>
                <Button onClick={() => { }} className="w-24 shadow-none p-0 m-0">
                    <FontAwesomeIcon size="xl" icon={faNoteSticky}></FontAwesomeIcon>
                </Button>
            </div>
        </div>
    )
}