'use client';

import AppError from "@src/common/errors/AppError";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Button from "@src/components/atoms/button/Button";
import Form from "@src/components/molecules/form/Form";
import User from "@src/entity/User";
import setLoginForm from "@src/hooks/form/login/LoginForm";
import userRepository from "@src/repository/user/UserRepository";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const { inputs, email, password } = setLoginForm()
    const [ error, setError ] = useState<AppError>()

    const handleOnClickLogin = async () => {           
            const user = await userRepository.login({ email, password } as User, setError);
            
            if (user){
                LocalStorageHelpers.set('user', user);
                setCookie('token', user.token)
                router.push('/');
            }
    }


    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Login</h1>
                <Form inputs={inputs} appError={error}></Form>
                <div className="flex">
                    <Button className="w-32" onClick={handleOnClickLogin}>Login</Button>
                    <Button className="w-32" onClick={() => router.push('/register')}>Cadastrar</Button>
                </div>
            </div>
        </div>
    )
}