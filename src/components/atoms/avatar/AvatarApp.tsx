import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Avatar from "react-avatar";

import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import User from "@src/entity/User";
import File from "@src/entity/File";
import serverConfig from "@src/common/config/serverConfig/ServerConfig";

interface IAvatarProps {
    avatar?: string;
    user?: User;
    file?: File;
    size: string;
}

export default function AvatarApp(props: IAvatarProps) {
    const { avatar, size, user, file } = props;

    
    if(avatar){
        return <Avatar round size={size} src={serverConfig.endpoint.path.file + avatar} name={avatar}></Avatar>
    } else if (user){
        if (user.avatar){
            return <Avatar round size={size} src={serverConfig.endpoint.path.file + user.avatar.filename}></Avatar>
        }

        return <Avatar round size={size} name={user.name}></Avatar>

    } else if (file) {
        return <Avatar round size={size} src={`data:image/${file.type};base64, ${file.data}`}></Avatar>
        
    } else {
        
        const data = LocalStorageHelpers.get<CreateUserResponse>('user');
        
        if(!data) return <Avatar round size={size}></Avatar>;

        const { user } = data;

        if (user.avatar){
            return <Avatar round size={size} src={serverConfig.endpoint.path.file + user.avatar}></Avatar>
        }

        return <Avatar round size={size} name={user.name}></Avatar>
    }
}