import { FileAccepted } from "@src/common/enum/FileAccepted";
import AppError from "@src/common/errors/AppError";
import FileNormalize from "@src/common/helpers/FileNormalize";
import File from "@src/entity/File";
import User from "@src/entity/User";
import { useState } from "react";

export default function useUserUpdate() {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [avatar, setAvatar] = useState<File>();
    const [error, setError] = useState<AppError>()

    const setUserData = (user: User) => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
    }

    const handleUploadAvatar = async (files?: FileList) => {
        if (files?.length) {
            const file = await FileNormalize(files[0]);
            setAvatar(file);
        } else {
            setError({ message: `Aceito apenas ${FileAccepted}` });
        }
    }

    return {
        inputs: [
            {
                type: "text",
                inputName: "Nome",
                inputId: "name",
                value: name,
                onChange: setName,
            },
            {
                type: "text",
                inputName: "E-mail",
                inputId: "email",
                value: email,
                onChange: setEmail,
            },
            {
                type: "password",
                inputName: "Senha",
                inputId: "password",
                value: password,
                onChange: setPassword,
            },
            {
                type: "file",
                inputName: "avatar",
                inputId: "avatar",
                onChange: handleUploadAvatar,
                useLabel: false
            }
        ],
        name,
        email,
        password,
        avatar,
        error,
        setError,
        setUserData
    };
}
