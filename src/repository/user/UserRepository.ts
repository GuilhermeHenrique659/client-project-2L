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
import Community from "@src/entity/Community";
import { UpdateUserRequestDTO } from "./types/UpdateUserDTO";

export class UserRepository implements IRepository {
    public readonly server: IServerRepository

    constructor(server: IServerRepository) {
        this.server = server
    }

    public async register(user: User, setError: Dispatch<AppError>): Promise<CreateUserResponse | undefined> {
        try {
            const { data } = await this.server.post<CreateUserResponse, User>('user', user);
            return data;
        } catch (error) {
            ServerError(error, setError);
        }
    }

    public async login(user: User, setError: Dispatch<AppError>): Promise<CreateUserResponse | undefined> {
        try {
            const { data } = await this.server.post<CreateUserResponse, User>('user/login', user);

            return data;
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async updateAvatar(file: File, setError: Dispatch<AppError>): Promise<string | undefined> {
        try {
            const avatar = await this.server.patch<{ filename: string }, File>('user/avatar', file, true);

            return avatar.data.filename;
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async createUserTag(tags: Tag[], setError: Dispatch<AppError>): Promise<Tag[] | undefined> {
        try {
            const { data } = await this.server.patch<Tag[], { tags: Tag[] }>('user/tags', { tags }, true);
            return data;
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async followCommunity(communityId: string, setError: Dispatch<AppError>) {
        try {
            await this.server.patch(`user/follow/${communityId}`, undefined, true);
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async getFollowingCommunity() {
        const { data } = await this.server.get<Community[]>('user/community', true);

        return data
    }

    @isAuthetificated()
    public async unfollowCommunity(communityId: string, setError: Dispatch<AppError>) {
        try {
            await this.server.patch(`user/unfollow/${communityId}`, undefined, true);
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async get(userId: string) {
        const { data } = await this.server.get<User>(`user/${userId}`, true);

        return data;
    }

    @isAuthetificated()
    public async update(user: UpdateUserRequestDTO, setError: Dispatch<AppError>) {
        try {
            const { data } = await this.server.patch<User, UpdateUserRequestDTO>('user', user, true);

            return data
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async followUser(userId: string, setError: Dispatch<AppError>) {
        try {
            await this.server.patch(`user/follow/user/${userId}`, undefined, true);
        } catch (error) {
            ServerError(error, setError);
        }
    }

    @isAuthetificated()
    public async unfollowUser(userId: string, setError: Dispatch<AppError>) {
        try {
            await this.server.patch(`user/unfollow/user/${userId}`, undefined, true);
        } catch (error) {
            ServerError(error, setError);
        }
    }
}


const userRepository = new UserRepository(serverRepository);
export default userRepository;