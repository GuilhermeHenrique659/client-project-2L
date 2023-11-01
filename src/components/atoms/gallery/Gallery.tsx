import serverConfig from "@src/common/config/serverConfig/ServerConfig";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Gallery({ images }: { images: string[] }) {
    if (images.length > 5)
        return (
            <div className="container mx-auto">
                <div className="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
                    {images.map((imageUrl, index) => (
                        <div key={index} className={index === 1 ? "w-full col-span-2 row-span-2 rounded-md" : "w-full rounded-md"}>
                            <LazyLoadImage src={serverConfig.endpoint.path.file + imageUrl} effect="blur" alt={`image-${index}`} />
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
                        <LazyLoadImage src={serverConfig.endpoint.path.file + imageUrl} effect="blur" alt={`image-${index}`} />
                    </div>
                ))}
            </div>
        )
}