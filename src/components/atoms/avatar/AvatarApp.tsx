import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Avatar from "react-avatar";

import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import User from "@src/entity/User";

interface IAvatarProps {
    avatar?: string
    user?: User
    size: string;
}

export default function AvatarApp(props: IAvatarProps) {
    const { avatar, size, user } = props;

    
    if(avatar){
        return <Avatar round size={size} src={'http://localhost:3001/file/'+avatar} name={avatar}></Avatar>
    } else if (user){
        if (user.avatar){
            return <Avatar round size={size} src={'http://localhost:3001/file/'+user.avatar.filename}></Avatar>
        }

        return <Avatar round size={size} name={user.name}></Avatar>
    } else {
        
        const data = LocalStorageHelpers.get<CreateUserResponse>('user');
        
        if(!data) return <Avatar round size={size}></Avatar>;

        const { user } = data;

        if (user.avatar){
            return <Avatar round size={size} src={'http://localhost:3001/file/'+user.avatar}></Avatar>
        }

        return <Avatar round size={size} name={user.name}></Avatar>
    }
}