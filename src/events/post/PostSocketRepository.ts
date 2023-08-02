import { Dispatch } from "react";
import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";
import AppError from "@src/common/errors/AppError";
import { IServerResponseError, IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import ServerError from "@src/repository/common/ServerError";
import Post from "@src/entity/Post";

class PostSocketRepository implements ISocketRepository {
    public readonly socket: ClientSocket;

    constructor(socket: ClientSocket){
        this.socket = socket;
    }

    public async like(postId: string, setError: Dispatch<AppError>) {
        try {
            await this.socket.emit('post/like', { postId });

            return true;
        } catch (error){
            ServerError(error, setError);
        }
    }
    
        public async communityPosts(page: number,communityId: string){
            const posts = await this.socket.emit<Post[]>('community/list', { communityId, page });

            return posts;
        }
}

export const postSocketRepository = new PostSocketRepository(ClientSocket.getInstance());