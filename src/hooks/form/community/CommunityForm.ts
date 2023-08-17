import { FileAccepted } from "@src/common/enum/FileAccepted";
import AppError from "@src/common/errors/AppError";
import FileNormalize from "@src/common/helpers/FileNormalize";
import File from "@src/entity/File";
import { ChangeEvent, useState } from "react";


export default function setCommunityForm() {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [cover, setCover] = useState<File>();
    const [avatar, setAvatar] = useState<File>();
    const [error, setError] = useState<AppError>()

    const handleUploadAvatar = async (files?: FileList) => {
        if (files?.length) {
            const file = await FileNormalize(files[0]);
            setAvatar(file);
        } else {
            setError({ message: `Aceito apenas ${FileAccepted}` });
        }
    }

    const handleUploadCover = async (files: FileList | null) => {
        if (files?.length) {
            const file = await FileNormalize(files[0]);
            setCover(file);
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
                onChange: setName,
                useLabel: false
            },
            {
                type: "text",
                inputName: "description",
                inputId: "description",
                onChange: setDescription,
                useLabel: false
            },
            {
                type: "file",
                inputName: "avatar",
                inputId: "avatar",
                onChange: handleUploadAvatar,
                useLabel: false
            },
        ],
        name,
        description,
        avatar,
        cover,
        handleUploadCover,
        setError,
        error
    };
}