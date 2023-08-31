import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import userSocketRepository from "@src/events/user/UserSocketRepository";
import { UserTypeInputDTO } from "@src/events/user/UserTypeDTO";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";

export default function useUserType() {
    const userWithToken = LocalStorageHelpers.get<CreateUserResponse>('user');

    const handleUserType = async (context: UserTypeInputDTO['context']) => {
        if (userWithToken) {
            const userTyping = {
                userData: userWithToken?.user,
                context: context
            }

            userSocketRepository.userTyping(userTyping);
        }
    }

    return { handleUserType }
}