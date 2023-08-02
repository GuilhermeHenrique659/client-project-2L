import User from "@src/entity/User";
import ClientSocket from "../ClientSocket/common/ClientSocket";
import ISocketRepository from "../ClientSocket/common/ISocketRespository";

class CommunitySocketRepository implements ISocketRepository {
    constructor (public readonly socket: ClientSocket) {}

    public async getUsers(communityId: string) {
        const users = await this.socket.emit<User[]>('community/list-users', { communityId });

        return users;
    }
}

const communitySocketRepository = new CommunitySocketRepository(ClientSocket.getInstance());
export default communitySocketRepository;