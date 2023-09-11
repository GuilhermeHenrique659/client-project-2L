import Tag from "@src/entity/Tag";

export type UpdateUserRequestDTO = {
    name?: string;
    email?: string;
    password?: string;
    avatar?: {
        type: string;
        data: string;
    }
    tags: Tag[];
    passwordToConfirm: string;
}