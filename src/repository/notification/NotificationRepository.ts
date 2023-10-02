import Tag from "@src/entity/Tag";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import serverRepository from "../common/ServerRepository";
import isAuthetificated from "@src/common/helpers/authenticate";
import Notification from "@src/entity/Notification";


class NotificationRepository implements IRepository {
    constructor(public readonly server: IServerRepository) { }

    @isAuthetificated()
    public async list() {
        const { data } = await this.server.get<Notification[]>(`notification/`);

        return data;
    }

    @isAuthetificated()
    public async delete(id: string) {
        await this.server.delete(`notification/${id}`)
    }
}

const notificationRepository = new NotificationRepository(serverRepository);
export default notificationRepository;