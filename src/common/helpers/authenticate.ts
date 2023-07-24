import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import LocalStorageHelpers from "./localStorageHelper";
import IRepository from "@src/repository/common/IRepository";

export default function isAuthetificated() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const { server } = this as IRepository;
            try {
                const user = LocalStorageHelpers.get<CreateUserResponse>('user');
                if (user)
                    server.setToken(user.token);
            } catch {
                server.setToken('');
            }

            return originalMethod.apply(this, args);
        };

        return descriptor
    };
}