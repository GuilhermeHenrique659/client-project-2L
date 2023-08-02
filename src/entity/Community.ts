import FileResponse from "./FileResponse";
import Tag from "./Tag";
import User from "./User";

export default interface Community {
    id?: string;

    name: string;

    description: string;

    avatar?: FileResponse;

    admin: User;

    cover?: FileResponse;

    tags: Tag[];
}