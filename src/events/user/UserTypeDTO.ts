import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse"

export type UserTypeInputDTO = {
    context: {
        id: string,
        name: string,
        hasContent: boolean,
    },
    userData: CreateUserResponse['user']
}