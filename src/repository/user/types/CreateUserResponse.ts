export type CreateUserResponse = {
    user: {
        id: string,
        name: string,
        avatar?: string,
    },
    token: string,
}