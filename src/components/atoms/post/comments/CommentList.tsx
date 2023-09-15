import Comment from "@src/entity/Comment";
import commentSocketRepository from "@src/events/comment/CommentRepository";
import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import Input from "../../input/Input";
import userSocketRepository from "@src/events/user/UserSocketRepository";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import { Comment as CommentSpinner } from "react-loader-spinner";
import Button from "../../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import AppError from "@src/common/errors/AppError";
import useUserType from "@src/hooks/user/useUserType";
import AvatarApp from "../../avatar/AvatarApp";
import { useRouter } from "next/navigation";

interface ICommentProps {
    postId: string;
}

export default function CommentList({ postId }: ICommentProps) {
    const router = useRouter();

    const [comments, setComments] = useState<Comment[]>([]);
    const [userType, setUserType] = useState<CreateUserResponse['user']>();
    const [content, setContent] = useState<string>();
    const [error, setError] = useState<AppError>();
    const [loading, setLoading] = useState(true);
    const [sendComment, setSendComment] = useState(false);
    const { handleUserType } = useUserType()

    const handleContent = async (content: string) => {
        await handleUserType({
            name: 'comment',
            id: postId,
            hasContent: content?.length ? true : false
        });
        setContent(content);
    }

    const handleSendComment = async () => {
        setSendComment(true);
        await handleUserType({
            name: 'comment',
            id: postId,
            hasContent: false,
        });
        if (content?.length)
            await commentSocketRepository.save({ content, postId }, setError);
        setSendComment(false);
    }

    const handleUserTyping = async ({ data }: IServerResponseSuccess<CreateUserResponse['user']>) => {
        setUserType(data);
    }

    const handleUserStopTyping = async ({ data }: IServerResponseSuccess<CreateUserResponse['user']>) => {
        setUserType(undefined);
    }

    const handleCommentAdded = async ({ data }: IServerResponseSuccess<Comment>) => {
        setComments((currentComment) => [...currentComment, data]);
    }


    userSocketRepository.socket.addListern('user/typing', handleUserTyping);
    userSocketRepository.socket.addListern('user/stop-typing', handleUserStopTyping);
    commentSocketRepository.socket.addListern('comment/added', handleCommentAdded);

    useEffect(() => {
        commentSocketRepository.getComments(postId).then((value) => {
            if (value && value[0])
                setComments(value);
            setLoading(false)
        })
    }, []);

    return (
        <div>
            {loading ? <Loading></Loading> :
                <div className="divide-y">
                    {comments.map((comment, index) => {
                        return <div key={index} className="flex flex-col p-2">
                            <div className="flex items-center p-2 cursor-pointer" onClick={() => router.push(`/user?userId=${comment.user?.id}`)}>
                                <AvatarApp avatar={comment.user?.avatar?.filename ?? comment.user?.name} size="48"></AvatarApp>
                                <h4 className="p-3 text-lg">{comment.user?.name}</h4>
                            </div>
                            <p className="p-2">{comment.content}</p>
                        </div>
                    })}
                    <div>
                        <div>
                            {userType && <div className="flex items-center">
                                <AvatarApp avatar={userType.avatar ?? userType.name} size="32"></AvatarApp>
                                <p className="p-2 mx-2">{userType.name} </p>
                                <CommentSpinner height={32} width={32} color="#000" backgroundColor="#D9D9D9"></CommentSpinner>
                            </div>}
                        </div>
                        <div className="flex items-center p-2">
                            {sendComment ? <Loading></Loading> :
                                <>
                                    <Input className="w-full" name="Discussão" useLabel={false} id="comment" stateSetter={handleContent}></Input>
                                    <Button className="w-7 h-7 rounded-full p-0 m-2 " onClick={handleSendComment}>
                                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                                    </Button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}