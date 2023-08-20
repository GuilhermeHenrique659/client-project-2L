import Post from "@src/entity/Post";

export type AddPostType = Post & {
    communityId: string;
}