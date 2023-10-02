import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";

class NotificationSocketRepository implements ISocketRepository {
    public readonly socket: ClientSocket;

    constructor(socket: ClientSocket) {
        this.socket = socket;
    }

}

const notificationSocketRepository = new NotificationSocketRepository(ClientSocket.getInstance());
export default notificationSocketRepository;