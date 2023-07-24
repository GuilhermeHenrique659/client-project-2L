import FileNormalize from "@src/common/helpers/FileNormalize";
import File from "@src/entity/File";
import { ChangeEvent, useState } from "react";

export default function usePostForm(){
    const [content, setContent] = useState<string>();
    const [filesBase, setfilesBase] = useState<File[]>([]);

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        setfilesBase([]);
        if (files?.length) {
            for(let index = 0; index < files.length; index++){
                const file = await FileNormalize(files[index]);
                if(file){
                    const previousFiles = filesBase
                    previousFiles.push(file)
                    setfilesBase(previousFiles)
                }
            }   
        }
    }

    return {
        content,
        filesBase,
        handleContent,
        handleUploadFiles
    }
}