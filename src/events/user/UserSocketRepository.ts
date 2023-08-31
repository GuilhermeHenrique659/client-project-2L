import User from "@src/entity/User";
import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { UserTypeInputDTO } from "./UserTypeDTO";

class UserSocketRepository implements ISocketRepository {
    public readonly socket: ClientSocket;

    constructor(socket: ClientSocket) {
        this.socket = socket;
    }

    public async userTyping(data: UserTypeInputDTO) {
        await this.socket.emit('user/type', data);
    }
}

const userSocketRepository = new UserSocketRepository(ClientSocket.getInstance());
export default userSocketRepository;