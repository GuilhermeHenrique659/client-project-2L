import serverConfig from "@src/common/config/serverConfig/ServerConfig";
import File from "@src/entity/File";
import FileResponse from "@src/entity/FileResponse";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ICoverProps {
    cover?: FileResponse;
    file?: File
}

export default function Cover({ cover, file }: ICoverProps) {
    const url = cover ? (serverConfig.endpoint.path.file + cover.filename) : `data:image/${file?.type};base64, ${file?.data}`

    if (url) {
        return (
            <LazyLoadImage src={url} effect="blur" alt={`image-cover`} />
        )
    }
    return (
        <div className="w-full h-72 rounded-md shadow-xl bg-gray-300 flex items-center justify-center" style={{ backgroundImage: "url(" + url + ")" }}>
            {!(cover || file) && <span className="text-gray-600 text-xl font-bold">Imagem não disponível</span>}
        </div>
    )
}