import File from "./File";
import FileResponse from "./FileResponse";
import Tag from "./Tag";
import User from "./User";

export default interface Post {
    id?: string;

    content: string;

    user: User;

    tags: Tag[];

    files: FileResponse[] | File[];

    hasLike: boolean;

    likeCount: number;
}