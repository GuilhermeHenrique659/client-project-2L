import isAuthetificated from "@src/common/helpers/authenticate";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import serverRepository from "../common/ServerRepository";
import Community from "@src/entity/Community";


class CommunityRepository implements IRepository {
    constructor (public readonly server: IServerRepository){}

    @isAuthetificated()
    public async getCommunityData(communityId: string){
        const { data } = await this.server.get<Community>(`community/${communityId}`);
        
        return data;
    }
}

const communityRepository = new CommunityRepository(serverRepository);
export default communityRepository;