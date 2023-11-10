'use client';

import AppError from "@src/common/errors/AppError";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import Form from "@src/components/molecules/form/Form";
import User from "@src/entity/User";
import ClientSocket from "@src/events/ClientSocket/common/ClientSocket";
import useLoginForm from "@src/hooks/form/login/LoginForm";
import userRepository from "@src/repository/user/UserRepository";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const { inputs, email, password } = useLoginForm();
    const [error, setError] = useState<AppError>();
    const [loading, setLoading] = useState(false);



    const handleOnClickLogin = async () => {
        setLoading(true);
        const user = await userRepository.login({ email, password } as User, setError);
        setLoading(false);
        if (user) {
            LocalStorageHelpers.set('user', user);
            setCookie('token', user.token)
            ClientSocket.getInstance().connect();
            router.push('/');
        }
    }


    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex">
            <div className="lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <img src="https://potencialize.adm.br/wp-content/uploads/2020/09/problemas.jpg" alt="" />
            </div>
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Login</h1>
                <Form className="items-center" inputs={inputs} appError={error}></Form>
                {loading ? <Loading></Loading> : <div className="flex flex-col">
                    <Button className="w-32 m-2" onClick={handleOnClickLogin}>Login</Button>
                    <Button className="w-32 m-2" onClick={() => router.push('/register')}>Cadastrar</Button>
                </div>}
            </div>
            </div>
        </div>
    )
}