'use client'

import LocalStorageHelpers from "@src/common/helpers/localStorageHelper"
import Button from "@src/components/atoms/button/Button";
import UserNavBar from "@src/components/atoms/userNavbar/UserNavBar";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Navbar() {
    const data = LocalStorageHelpers.get<CreateUserResponse>('user');
    const router = useRouter();

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient)
        return (
            <div className="bg-cnt-dark w-full h-fit p-5 flex items-center justify-between max-md:items-start max-md:flex-col md:flex-row">
                <div className="">
                    <Button className="bg-cnt-dark shadow-none text-neutral-50 flex items-center" onClick={() => router.push('/')} >
                        <div className="rounded-md w-14 h-14 bg-slate-400" id="logo">
                        </div>
                        <h3 className="ml-5 text-slate-50">AppName</h3>
                    </Button>
                </div>
                <div className="max-md:mt-8 max-md:border-t md:pt-2 max-md:w-full">
                    {data && <UserNavBar data={data}></UserNavBar>}
                </div>
            </div>
        )
}