
export default function Gallery({ images }: { images: string[] }) {
    if (images.length > 1)
        return (
            <div className="container mx-auto">
                <div className="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
                    {images.map((imageUrl, index) => (
                        <div key={index} className={index === 1 ? "w-full col-span-2 row-span-2 rounded-md" : "w-full rounded-md"}>
                            <img src={`http://localhost:3001/file/${imageUrl}`} alt={`image-${index}`} />
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
                        <img src={`http://localhost:3001/file/${imageUrl}`} alt={`image-${index}`} />
                    </div>
                ))}
            </div>
        )
}