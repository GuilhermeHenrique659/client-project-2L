import User from "@src/entity/User";
import IServerRepository from "../common/IServerRepository";
import { Dispatch } from "react";
import { CreateUserResponse } from "./types/CreateUserResponse";
import ServerError from "../common/ServerError";
import IRepository from "../common/IRepository";
import AppError from "@src/common/errors/AppError";
import File from "@src/entity/File";
import serverRepository from "../common/ServerRepository";
import isAuthetificated from "@src/common/helpers/authenticate";
import Tag from "@src/entity/Tag";

export class UserRepository implements IRepository {
    public readonly server: IServerRepository

    constructor (server: IServerRepository) {
        this.server = server
    }

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

    @isAuthetificated()
    public async updateAvatar(file: File, setError: Dispatch<AppError>): Promise<string | undefined> {
        const avatar = await this.server.patch<{ filename: string }, File>('user/avatar', file, true);

        if ('data' in avatar){
            return avatar.data.filename
        }

        ServerError(avatar, setError);
    }

    @isAuthetificated()
    public async createUserTag(tags: Tag[], setError: Dispatch<AppError>): Promise<Tag[] | undefined> {
        const tagsResponse = await this.server.patch<Tag[], {tags: Tag[]}>('user/tags', {tags}, true);
        console.log(tagsResponse);
        
        if ('data' in tagsResponse) return tagsResponse.data;

        ServerError(tagsResponse, setError);
    }
}


const userRepository = new UserRepository(serverRepository);
export default userRepository;