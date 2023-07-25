import Post from "@src/entity/Post";
import Gallery from "../../gallery/Gallery";
import FileResponse from "@src/entity/FileResponse";

interface IPostBodyProps {
    post: Post
}

export default function PostBody({ post }: IPostBodyProps){
    const files = post.files as FileResponse[];

    return (
        <div className="my-6">
            <p className="my-4">
            {post.content}            
            </p>
            <p>{post.tags && post.tags.map(({description, id}) => `#${description} `)}</p>
            <Gallery images={files.map((file) => file.filename)} />
        </div>
    )
}