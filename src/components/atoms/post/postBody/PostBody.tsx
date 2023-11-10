import Post from "@src/entity/Post";
import Gallery from "../../gallery/Gallery";
import FileResponse from "@src/entity/FileResponse";

interface IPostBodyProps {
    post: Post
}

export default function PostBody({ post }: IPostBodyProps){
    const files = post.files as FileResponse[];

    return (
        <div className="my-6 max-md:text-sm">
            <p className="my-4 text-black">
            {post.content}            
            </p>
            <p className="text-black">{post.tags && post.tags.map(({description, id}) => `#${description} `)}</p>
            <Gallery images={files.map((file) => file.filename)} />
        </div>
    )
}