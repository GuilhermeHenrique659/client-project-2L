import Tag from "@src/entity/Tag";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import serverRepository from "../common/ServerRepository";


class TagRepository implements IRepository {
    constructor (public readonly server: IServerRepository){}

    public async searchTag(searchTerm: string) {
        const tags = await this.server.get<Tag[]>(`tag/${searchTerm}`);

        if ('data' in tags) return tags.data;
    }
}

const tagRepository = new TagRepository(serverRepository);
export default tagRepository;