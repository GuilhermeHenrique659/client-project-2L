import FileResponse from "@src/entity/FileResponse";

interface ICoverProps {
    cover?: FileResponse;
}

export default function Cover({ cover }: ICoverProps) {
    return (
        <div className="w-full h-72 rounded-md shadow-xl bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-xl font-bold">Imagem não disponível</span>
        </div>
    )
}