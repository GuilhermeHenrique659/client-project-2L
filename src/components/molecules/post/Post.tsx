import PostHeader from "@src/components/atoms/post/header/PostHeader";
import PostBody from "@src/components/atoms/post/postBody/PostBody";
import PostFoot from "@src/components/atoms/post/postFoot/PostFoot";
import Post from "@src/entity/Post";

interface IPostProps {
    post: Post
}


export default function PostComponent({ post }: IPostProps){
    return (
        <div className="w-6/12 p-4 max-lg:w-full border-b">
           <div className="p-2 mb-4">
                <PostHeader user={post.user}></PostHeader>
                <PostBody post={post}></PostBody>
                <PostFoot post={post}></PostFoot>
           </div>
        </div>
    )
}