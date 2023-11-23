import { FileAccepted } from "@src/common/enum/FileAccepted";
import { ChangeEvent, useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface IInputFileProps {
    handleOnChange: (files: FileList | null) => Promise<void>;
    multiple?: boolean
}

export default function InputFile(props: IInputFileProps) {
    const [selectFile, setSelectFile] = useState<number>()

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSelectFile(e.target.files?.length)
        props.handleOnChange(e.target.files);
    }

    return (
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className=" cursor-pointer">
                <FontAwesomeIcon size="xl" color="black" icon={faUpload}></FontAwesomeIcon>
            </label>
            <input id="dropzone-file" type="file" multiple={props.multiple} className="hidden" onChange={e => handleUploadFile(e)} />
        </div>
    )
}