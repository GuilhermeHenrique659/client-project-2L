'use client'

import Loading from "@src/components/atoms/loading/Loading";
import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import Navbar from "@src/components/molecules/navbar/Navbar";
import UserList from "@src/components/organism/user/UsersList";
import User from "@src/entity/User";
import userRepository from "@src/repository/user/UserRepository";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userRepository.getFollowersUsers().then((value) => {
            setUsers(value);
        })
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="flex justify-center mt-10 ">
                <div className="w-3/4 h-fit max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
                    <FeedBar></FeedBar>
                    <TooBar setData={() => null}></TooBar>
                    <h3 className="border-b w-full flex justify-center">Seguindo</h3>
                    <div className="w-3/5 p-4 max-md:w-full max-md:p-1">
                        {loading ? <Loading></Loading> : <UserList users={users}></UserList>}
                    </div>
                </div>
            </div>
        </>
    )
}