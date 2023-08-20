import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";

class UserSocketRepository implements ISocketRepository {
    public readonly socket: ClientSocket;

    constructor(socket: ClientSocket) {
        this.socket = socket;
    }
}

const userSocketRepository = new UserSocketRepository(ClientSocket.getInstance());
export default userSocketRepository;