'use client'

import LocalStorageHelpers from "@src/common/helpers/localStorageHelper"
import Button from "@src/components/atoms/button/Button";
import UserNavBar from "@src/components/atoms/userNavbar/UserNavBar";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TooBar from "../ToolBar/ToolBar";
import PostForm from "../post/PostForm";
import Post from "@src/entity/Post";


export default function Navbar({ setPosts }: { setPosts: Dispatch<SetStateAction<Post[]>> }) {
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
                            <img className=" rounded-md" src="https://potencialize.adm.br/wp-content/uploads/2020/09/problemas.jpg" />
                        </div>
                        <h3 className="ml-5 text-slate-50">Qual é seu problema ?</h3>
                    </Button>
                </div>
                <div className="">
                    <TooBar setData={setPosts}>
                        <PostForm setData={setPosts} setShowForm={() => { return }}></PostForm>
                    </TooBar>
                </div>
                <div className="max-md:mt-8 max-md:border-t md:pt-2 max-md:w-full">
                    {data && <UserNavBar data={data}></UserNavBar>}
                </div>
            </div>
        )
}