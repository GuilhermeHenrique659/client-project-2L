import AvatarApp from "@src/components/atoms/avatar/AvatarApp"

export default function FeedBar(){
    const followList = ['Batman', 'Thor', 'Bruce', '1e794eb17301b456ab00.png', 'Tony Stark', 'Batman', 'Thor', 'Bruce', '1e794eb17301b456ab00.png', 'Tony Stark']

    return (
        <div className="w-96 h-24 border-b mb-10 overflow-x-auto whitespace-nowrap">
                {followList.map((follow, index) => {
                return <a key={index}  className="m-2 p-1" href="">
                    <AvatarApp avatar={follow} size="64"></AvatarApp>
                </a>
            })}
        </div>
    )
}