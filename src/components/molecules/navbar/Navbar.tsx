import LocalStorageHelpers from "@src/common/helpers/localStorageHelper"
import UserNavBar from "@src/components/atoms/userNavbar/UserNavBar";
import User from "@src/entity/User";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse"




export default function Navbar() {
    const data = LocalStorageHelpers.get<CreateUserResponse>('user');

    return (
        <div className="bg-cnt-dark w-full h-fit p-5 flex items-center justify-between max-sm:items-start max-sm:flex-col md:flex-row">
            <div className="flex items-center">
                <div className="rounded-md w-14 h-14 bg-slate-400" id="logo">
                </div>
                <h3 className="ml-5">AppName</h3>
            </div>
            <div className="max-sm:mt-8 max-sm:border-t sm:pt-2">
                {data && <UserNavBar user={data.user as User}></UserNavBar>}
            </div>
        </div>
    )
}