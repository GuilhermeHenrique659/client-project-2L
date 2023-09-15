
import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import User from "@src/entity/User";
import { useRouter } from "next/navigation";

export default function UserList(props: { users: User[] }) {
    const router = useRouter();


    return (
        <div>
            {props.users.map((user, index) => {
                return (
                    <div className="flex justify-between items-center p-4 max-md:p-0 max-md:py-4" key={index}>
                        <div className="flex items-center cursor-pointer" onClick={() => router.push(`/user?userId=${user.id}`)}>
                            <AvatarApp avatar={user?.avatar?.filename ?? user?.name} size="64"></AvatarApp>
                            <h3 className="px-4 text-lg overflow-hidden truncate max-md:w-12">{user?.name}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}