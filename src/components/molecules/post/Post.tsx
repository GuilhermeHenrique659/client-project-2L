import PostHeader from "@src/components/atoms/post/header/PostHeader";
import PostBody from "@src/components/atoms/post/postBody/PostBody";

export default function Post(){
    return (
        <div className="w-6/12 p-4 max-md:w-full border-b">
           <div className="p-2 mb-4">
                <PostHeader></PostHeader>
                <PostBody></PostBody>
           </div>
        </div>
    )
}