import PostHeader from "@src/components/atoms/post/header/PostHeader";
import PostHeaderCommunity from "@src/components/atoms/post/header/PostHeaderCommunity";
import PostBody from "@src/components/atoms/post/postBody/PostBody";
import PostFoot from "@src/components/atoms/post/postFoot/PostFoot";
import Post from "@src/entity/Post";

interface IPostProps {
    post: Post
}


export default function PostComponent({ post }: IPostProps) {
    return (
        <div className="w-6/12 p-4 max-md:p-0 max-xl:w-full border-b">
            <div className="p-2 mb-4">
                <div className="flex flex-col justify-start">
                    {post.community && <PostHeaderCommunity community={post.community}></PostHeaderCommunity>}
                    <PostHeader user={post.user}></PostHeader>
                </div>
                <PostBody post={post}></PostBody>
                <PostFoot post={post}></PostFoot>
            </div>
        </div>
    )
}