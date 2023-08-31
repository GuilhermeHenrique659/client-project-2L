import Comment from "@src/entity/Comment";
import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";
import { Dispatch } from "react";
import AppError from "@src/common/errors/AppError";
import ServerError from "@src/repository/common/ServerError";

class CommentSocketRepository implements ISocketRepository {
    constructor(public readonly socket: ClientSocket) { }

    public async getComments(postId: string) {
        const comments = await this.socket.emit<Comment[]>('comment/', { postId });

        return comments;
    }

    public async save(data: { content: string, postId: string }, setError: Dispatch<AppError>) {
        try {
            const comment = await this.socket.emit<Comment>('comment/add', data);

            return comment
        } catch (error) {
            ServerError(error, setError);
        }
    }
}

const commentSocketRepository = new CommentSocketRepository(ClientSocket.getInstance());
export default commentSocketRepository;