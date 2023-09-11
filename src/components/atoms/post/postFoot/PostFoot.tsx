import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../button/Button";
import { faNoteSticky, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Post from "@src/entity/Post";
import { useState } from "react";
import postRepository from "@src/repository/post/PostRepository";
import AppError from "@src/common/errors/AppError";
import InputShowError from "../../input/InputError";
import { postSocketRepository } from "@src/events/post/PostSocketRepository";
import { LikeDataType } from "@src/events/post/types/LikePostType";
import CommentList from "../comments/CommentList";

interface IPostFootProps {
    post: Post;
}

export default function PostFoot({ post }: IPostFootProps) {
    const [likeCount, setLikeCount] = useState<number>(post.likeCount ?? 0);
    const [error, setError] = useState<AppError>();
    const [hasLike, setHasLike] = useState<boolean>(post.hasLike);
    const [showHandleComment, setShowHandleComment] = useState(false);

    const handleLikeEvent = (data: LikeDataType) => {
        setLikeCount((currentLikeCount) => {
            if (post.id === data.postId) {
                return currentLikeCount += 1;
            }
            return currentLikeCount;
        });
    }

    postSocketRepository.socket.addListern('post/like-added', handleLikeEvent);

    const handleAddLike = async (postId: string) => {
        await postSocketRepository.like(postId, setError);
        setHasLike(true);
        setLikeCount(previous => previous + 1);
    }

    return (
        <div>
            <div className=" w-6/6 rounded-md flex h-12 max-md:flex-col max-md:h-fit overflow-hidden md:divide-x divide-cnt-dark items-center md:justify-between bg-button-color">
                <div className="flex items-center md:items-start">
                    <Button onClick={() => setShowHandleComment(!showHandleComment)} className="shadow-none px-4">Discussão</Button>
                </div>
                <div className="flex items-center md:items-end">
                    <Button onClick={() => handleAddLike(post.id as string)} disabled={hasLike} className="w-24 shadow-none flex px-4 m-0">
                        <h6 className="p-4">{likeCount}</h6>
                        <FontAwesomeIcon size="xl" icon={hasLike ? faHeartSolid : faHeartRegular}></FontAwesomeIcon>
                        {error && <InputShowError>{error?.message}</InputShowError>}
                    </Button>
                    <Button onClick={() => { }} className="w-24 shadow-none p-0 m-0">
                        <FontAwesomeIcon size="xl" icon={faNoteSticky}></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
            {showHandleComment && <CommentList postId={post.id as string}></CommentList>}
        </div>
    )
}