'use client';
import { FileAccepted } from "@src/common/enum/FileAccepted";
import AppError from "@src/common/errors/AppError";
import FileNormalize from "@src/common/helpers/FileNormalize";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Button from "@src/components/atoms/button/Button";
import InputShowError from "@src/components/atoms/input/InputError";
import Loading from "@src/components/atoms/loading/Loading";
import userRepository from "@src/repository/user/UserRepository";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from "react";


export default function RegisterAvatar() {
    const router = useRouter();
    const [error, setError] = useState<AppError>()
    const [loading, setLoading] = useState<boolean>(false);
    const [filename, setFilename] = useState<string>()
    
    const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files
        setLoading(true)
        if (files?.length) {
            const file = await FileNormalize(files[0]);
            if (file){
                const filesaved = await userRepository.updateAvatar(file, setError);
                setFilename(filesaved);
            } else {
                setError({ message: `Aceito apenas ${FileAccepted}`})
            }
        }
        setLoading(false)
    }

    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Cadastro Avatar</h1>
                <AvatarApp avatar={filename} size="150" />
                {loading ? 
                    <Loading></Loading> : 
                    <input id="dropzone-file" className="p-2 m-1 rounded-t-md" type="file" name="file" onChange={handleUploadAvatar} />
                }
                {error && <InputShowError>{error.message}</InputShowError>}
                <div>
                    <Button className="w-32" onClick={() => router.push('/register/tags')}>Proximo</Button>
                </div>
            </div>
        </div>
    )
}