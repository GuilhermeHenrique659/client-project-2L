import Post from "@src/entity/Post";
import Gallery from "../../gallery/Gallery";

interface IPostBodyProps {
    post: Post
}

export default function PostBody({ post }: IPostBodyProps){
    
    return (
        <div className="my-6">
            <p className="my-4">
            {post.content}            
            </p>
            <Gallery images={post.files.map((file) => file.filename)} />
        </div>
    )
}