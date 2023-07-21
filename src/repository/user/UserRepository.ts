import User from "@src/entity/User";
import IServerRepository from "../common/IServerRepository";
import { Dispatch } from "react";
import { CreateUserResponse } from "./types/CreateUserResponse";
import ServerError from "../common/ServerError";
import IRepository from "../common/IRepository";
import AppError from "@src/common/errors/AppError";
import File from "@src/entity/File";
import autheticate from "@src/common/helpers/authenticate";
import serverRepository from "../common/ServerRepository";

export class UserRepository implements IRepository {
    constructor (public readonly server: IServerRepository) {}

    public async register(user: User, setError: Dispatch<AppError>): Promise<CreateUserResponse | undefined> {
        const userCreated = await this.server.post<CreateUserResponse, User>('user', user);

        if ('data' in userCreated){
            return userCreated.data;
        }

        ServerError(userCreated, setError);
    }

    public async login(user: User, setError: Dispatch<AppError>): Promise<CreateUserResponse | undefined>{
        const userLogin = await this.server.post<CreateUserResponse, User>('user/login', user);

        if ('data' in userLogin){
            return userLogin.data;
        }

        ServerError(userLogin, setError);
    }

    public async updateAvatar(file: File, setError: Dispatch<AppError>): Promise<string | undefined> {
        autheticate(this.server);
        const avatar = await this.server.patch<{ filename: string }, File>('user/avatar', file, true);

        if ('data' in avatar){
            return avatar.data.filename
        }

        ServerError(avatar, setError);
    }
}


const userRepository = new UserRepository(serverRepository);
export default userRepository;