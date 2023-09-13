import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarApp from "../../avatar/AvatarApp";
import { faTrash, faPenToSquare, faWarning } from "@fortawesome/free-solid-svg-icons";
import User from "@src/entity/User";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import postRepository from "@src/repository/post/PostRepository";
import Post from "@src/entity/Post";
import AppError from "@src/common/errors/AppError";
import Loading from "../../loading/Loading";

interface IPostHeader {
    user: User,
    post: Post,
    setPosts: Dispatch<SetStateAction<Post[]>>
}

export default function PostHeader({ user, post, setPosts }: IPostHeader) {
    const router = useRouter();
    const [removeConfirm, setRemoveConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AppError>();

    const currentUser = LocalStorageHelpers.get<CreateUserResponse>('user')

    const handleDeletePost = async () => {
        if (!removeConfirm) {
            setRemoveConfirm(true);
            return;
        } else {
            setLoading(true);
            await postRepository.remove(post.id as string, setError);
            setPosts((currentPosts) => currentPosts.filter(currentPost => currentPost.id !== post.id))
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <Loading></Loading> : <div className="h-16 flex flex-row justify-between">
                <div className="flex items-center">
                    <AvatarApp user={user} size="64"></AvatarApp>
                    <h4 className="p-6 max-md:text-sm cursor-pointer" onClick={() => router.push(`/user?userId=${user.id}`)}>{user.name}</h4>
                </div>
                {(currentUser && currentUser.user.id === user.id) &&
                    <div>
                        <button className="p-4" onClick={handleDeletePost}>{removeConfirm && <>Tem certeza que deseja remover</>}<FontAwesomeIcon size="xl" icon={removeConfirm ? faWarning : faTrash}></FontAwesomeIcon></button>
                    </div>
                }
            </div>
            }
        </>
    )
}