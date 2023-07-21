import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import LocalStorageHelpers from "./localStorageHelper";
import IServerRepository from "@src/repository/common/IServerRepository";

export default function autheticate(server: IServerRepository) {
        try {
            const user = LocalStorageHelpers.get<CreateUserResponse>('user');
            if (user){
                server.setToken(user.token);
            }

        } catch (err) {
            console.log('token not found');
        }
}