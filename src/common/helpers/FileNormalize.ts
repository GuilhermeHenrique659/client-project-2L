import { FileAccepted } from "../enum/FileAccepted";
import { fileToBase64 } from "./FileToBase64";

export default async function FileNormalize(file: File) { 
    const type = file.type.split('/')[1]
    console.log(type);
    
    if (FileAccepted.some(fileType => fileType === type)){
        const fileNormalize = (await fileToBase64(file)) as string;
        return {
            data: fileNormalize.replace('data:', '').replace(/^.+,/, ''),
            type
        }
    }
}