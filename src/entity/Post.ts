import File from "./File";
import Tag from "./Tag";

export default interface Post {
    id?: string;

    content: string;

    tags: Tag[];

    files: File[];
}