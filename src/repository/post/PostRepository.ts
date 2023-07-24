import Post from "@src/entity/Post";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import { Dispatch } from "react";
import AppError from "@src/common/errors/AppError";
import isAuthetificated from "@src/common/helpers/authenticate";
import ServerError from "../common/ServerError";
import serverRepository from "../common/ServerRepository";

class PostRepository implements IRepository {
    constructor (public readonly server: IServerRepository) {}

    @isAuthetificated()
    public async save(post: Post, setError: Dispatch<AppError>) {
        const createdPost = await this.server.post<Post>('post/', post, true);
        
        if('data' in createdPost) return createdPost.data;

        ServerError(createdPost, setError);
    }
}

const postRepository = new PostRepository(serverRepository);
export default postRepository;