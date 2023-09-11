import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import User from "@src/entity/User";

interface IUserProfileProps {
    user: User
}

export default function Profile({ user }: IUserProfileProps) {
    return (
        <div className="p-6 m-10 flex flex-col max-md:items-center">

            <div className="flex max-md:flex-col max-md:items-center">
                <div className="flex items-center p-4 m-4">
                    <AvatarApp user={user} size="128"></AvatarApp>
                    <h2 className="text-lg px-10">Nome: {user.name}</h2>
                </div>
                <div className="p-4">
                    <p className="text-md m-4">Interesses</p>
                    <div className="flex flex-col">
                        <div className="bg-input-bg h-20 p-2 w-full overflow-y-auto scroll-p-px rounded-md">
                            {user.tags && user.tags.length > 0 ? user.tags?.map(tag => ` #${tag.description}`) : <>
                                <h4>Nada de interessante </h4>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}