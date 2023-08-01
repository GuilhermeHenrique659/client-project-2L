import Tag from "@src/entity/Tag";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import serverRepository from "../common/ServerRepository";


class TagRepository implements IRepository {
    constructor (public readonly server: IServerRepository){}

    public async searchTag(searchTerm: string) {
        const { data } = await this.server.get<Tag[]>(`tag/${searchTerm}`);

        return data;
    }
}

const tagRepository = new TagRepository(serverRepository);
export default tagRepository;