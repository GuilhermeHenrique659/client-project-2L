import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../button/Button";
import { faC, faComment, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
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
            <div className="flex p-4 justify-end w-20">
                <button className="mx-4" onClick={() => setShowHandleComment(!showHandleComment)} >
                    <FontAwesomeIcon size="xl" icon={faComment} style={{ color: "gray" }} ></FontAwesomeIcon>
                </button>
                <button onClick={() => handleAddLike(post.id as string)} disabled={hasLike}>
                    <FontAwesomeIcon size="xl" icon={hasLike ? faHeartSolid : faHeartRegular} style={{ color: 'gray' }} ></FontAwesomeIcon>
                    {error && <InputShowError>{error?.message}</InputShowError>}
                </button>
            </div>
            {showHandleComment && <CommentList postId={post.id as string}></CommentList>}
        </div>
    )
}