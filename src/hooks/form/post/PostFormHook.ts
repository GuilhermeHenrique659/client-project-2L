import { FileAccepted } from "@src/common/enum/FileAccepted";
import AppError from "@src/common/errors/AppError";
import FileNormalize from "@src/common/helpers/FileNormalize";
import File from "@src/entity/File";
import { ChangeEvent, useState } from "react";

export default function usePostForm(){
    const [content, setContent] = useState<string>();
    const [filesBase, setfilesBase] = useState<File[]>([]);
    const [error, setError] = useState<AppError>()

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleUploadFiles = async (fileList: FileList | null) => {
        const files = fileList
        setfilesBase([]);
        if (files?.length) {
            for(let index = 0; index < files.length; index++){
                const file = await FileNormalize(files[index]);
                if(file){
                    const previousFiles = filesBase
                    previousFiles.push(file)
                    setfilesBase(previousFiles)
                } else {
                    setError({ message: `Aceito apenas ${FileAccepted}`});
                }
            }   
        }
    }

    return {
        content,
        filesBase,
        error,
        handleContent,
        handleUploadFiles,
        setError
    }
}