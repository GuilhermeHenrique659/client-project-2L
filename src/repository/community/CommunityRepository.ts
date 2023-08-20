import isAuthetificated from "@src/common/helpers/authenticate";
import IRepository from "../common/IRepository";
import IServerRepository from "../common/IServerRepository";
import serverRepository from "../common/ServerRepository";
import Community from "@src/entity/Community";
import { Dispatch } from "react";
import AppError from "@src/common/errors/AppError";
import ServerError from "../common/ServerError";


class CommunityRepository implements IRepository {
    constructor(public readonly server: IServerRepository) { }

    @isAuthetificated()
    public async getCommunityData(communityId: string) {
        const { data } = await this.server.get<Community>(`community/${communityId}`, true);

        return data;
    }

    @isAuthetificated()
    public async save(community: Community, setError: Dispatch<AppError>) {
        try {
            const { data } = await this.server.post<Community>('community', community, true);
            return data
        } catch (error) {
            ServerError(error, setError);
        }

    }
}

const communityRepository = new CommunityRepository(serverRepository);
export default communityRepository;