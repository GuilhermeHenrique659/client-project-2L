import { IServerResponseError, IServerResponseSuccess } from "./IServerResponseDTO";

export default interface IServerRepository {
    setToken(token: string): void;

    get<R>(path: string, auth?: boolean): Promise<IServerResponseSuccess<R>>
    post<R, T = R>(path: string, payload?: T, auth?: boolean): Promise<IServerResponseSuccess<R>>
    patch<R, T = R>(path: string, payload?: T, auth?: boolean): Promise<IServerResponseSuccess<R>>
    delete(path: string): Promise<void>;
}