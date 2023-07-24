'use client';

import AppError from "@src/common/errors/AppError";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import Form from "@src/components/molecules/form/Form";
import User from "@src/entity/User";
import setRegisterForm from "@src/hooks/form/register/RegisterForm";
import userRepository from "@src/repository/user/UserRepository";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const { inputs, name, email, password } = setRegisterForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AppError>();

    const handleOnClickSave = async () => {
        setLoading(true);
        const user = await userRepository.register({ name, email, password } as User, setError);
        setLoading(false);

        if (user) {
            LocalStorageHelpers.set('user', user);
            setCookie('token', user.token)
            router.push('/register/avatar');
        }
    }

    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Cadastro</h1>
                <Form inputs={inputs} appError={error}></Form>
                {loading && <Loading></Loading>}
                <div className="flex">
                    <Button className="w-32" onClick={() => router.push('/login')}>Voltar</Button>
                    <Button className="w-32" onClick={handleOnClickSave}>Salvar</Button>
                </div>
            </div>
        </div>
    )
}