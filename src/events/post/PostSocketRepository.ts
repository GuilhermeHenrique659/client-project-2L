import { Dispatch } from "react";
import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";
import AppError from "@src/common/errors/AppError";
import { IServerResponseError, IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import ServerError from "@src/repository/common/ServerError";

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
            ServerError(error as IServerResponseError, setError);
        }
    }
}

export const postSocketRepository = new PostSocketRepository(ClientSocket.getInstance());