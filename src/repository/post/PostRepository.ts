import Post from "@src/entity/Post";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import { Dispatch } from "react";
import AppError from "@src/common/errors/AppError";
import isAuthetificated from "@src/common/helpers/authenticate";
import ServerError from "../common/ServerError";
import serverRepository from "../common/ServerRepository";

class PostRepository implements IRepository {
    constructor(public readonly server: IServerRepository) { }

    @isAuthetificated()
    public async getList(page: number) {
        const { data } = await this.server.get<Post[]>(`post?page=${page}`, true);
        return data;
    }

    @isAuthetificated()
    public async save(post: Post, setError: Dispatch<AppError>) {
        try {
            const { data } = await this.server.post<Post>('post/', post, true);
            return data;
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async remove(id: string, setError: Dispatch<AppError>) {
        try {
            await this.server.delete(`post/${id}`);
        } catch (error) {
            ServerError(error, setError);
        }
    }
}

const postRepository = new PostRepository(serverRepository);
export default postRepository;