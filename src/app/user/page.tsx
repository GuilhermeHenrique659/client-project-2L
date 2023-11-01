'use client'

import AppError from "@src/common/errors/AppError";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Button from "@src/components/atoms/button/Button";
import InputShowError from "@src/components/atoms/input/InputError";
import Loading from "@src/components/atoms/loading/Loading";
import Form from "@src/components/molecules/form/Form";
import Navbar from "@src/components/molecules/navbar/Navbar";
import TagSearch from "@src/components/molecules/tag/TagSearch";
import Profile from "@src/components/molecules/user/Profile";
import UserForm from "@src/components/molecules/user/UserForm";
import CommunityList from "@src/components/organism/community/CommunityList";
import Community from "@src/entity/Community";
import Tag from "@src/entity/Tag";
import User from "@src/entity/User";
import useUserUpdate from "@src/hooks/form/user/UserUpdateForm";
import userRepository from "@src/repository/user/UserRepository";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


export default function UserProfile() {
    const userLogged = LocalStorageHelpers.get<CreateUserResponse>('user');

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const [user, setUser] = useState<User>();
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [showUserForm, setShowUserForm] = useState<boolean>(false);

    const handleShowUserForm = () => {
        if (userLogged && userLogged.user.id === user?.id) {
            setShowUserForm(!showUserForm)
        }
    }

    useEffect(() => {
        if(userId)
            userRepository.getFollowingCommunity(userId).then((value) => {
            setCommunities(value);
        })
    }, []);

    useEffect(() => {
        if (userId) {
            userRepository.get(userId).then((value) => {
                setUser(value);
                setUserIsLogged(value?.id === userLogged?.user.id)
            });
        }
    }, [userId]);

    return (
        <>
            <Navbar></Navbar>
            {!user ? <Loading></Loading> : <div className="flex justify-center mt-10">
                <div className="w-3/4 max-lg:w-full max-lg:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-start justify-start max-md:items-center max-md:justify-center p-10">
                    {showUserForm ? <UserForm user={user} setShowForm={setShowUserForm}></UserForm> : <Profile user={user} currentUserId={userLogged?.user.id as string} ></Profile>}
                    {userIsLogged && <Button className="w-36 m-2" onClick={handleShowUserForm}>{
                        !showUserForm ? <p>Editar</p> : <p>Cancelar</p>
                    }</Button>}
                    <div className="p-10 w-full">
                        <h3 className="border-b w-full flex justify-center">Communidades seguindo</h3>
                        <div className="w-full p-4 max-md:w-full max-md:p-1">
                            {!communities ? <Loading></Loading> : <CommunityList communities={communities}></CommunityList>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}