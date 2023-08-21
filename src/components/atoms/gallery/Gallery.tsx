import serverConfig from "@src/common/config/serverConfig/ServerConfig";
import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
    if (images.length > 5)
        return (
            <div className="container mx-auto">
                <div className="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
                    {images.map((imageUrl, index) => (
                        <div key={index} className={index === 1 ? "w-full col-span-2 row-span-2 rounded-md" : "w-full rounded-md"}>
                            <Image src={serverConfig.endpoint.path.file + imageUrl} alt={`image-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        );
    else 
        return (
            <div>
                {images.map((imageUrl, index) => (
                    <div key={index} className={"w-full h-full"}>
                        <Image src={serverConfig.endpoint.path.file + imageUrl} alt={`image-${index}`} />
                    </div>
                ))}
            </div>
        )
}