import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Form from "../form/Form";
import TagSearch from "../tag/TagSearch";
import User from "@src/entity/User";
import useUserUpdate from "@src/hooks/form/user/UserUpdateForm";
import Tag from "@src/entity/Tag";
import { useEffect, useState } from "react";
import Button from "@src/components/atoms/button/Button";
import Input from "@src/components/atoms/input/Input";
import Loading from "@src/components/atoms/loading/Loading";
import userRepository from "@src/repository/user/UserRepository";

interface IUserFormProps {
    user: User,
    setShowForm: (value: boolean) => void;
}

export default function UserForm({ user, setShowForm }: IUserFormProps) {
    const {
        inputs,
        setUserData,
        name,
        email,
        password,
        avatar,
        error,
        setError,
    } = useUserUpdate();
    const [passwordToConfirm, setPasswordToConfirm] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmitUser = async () => {
        setLoading(true)
        const userUpdated = await userRepository.update({ name, email, password, avatar, tags, passwordToConfirm }, setError);
        setLoading(false);
        if (userUpdated) {
            setUserData(userUpdated);
        }
        setShowForm(false)
    }

    useEffect(() => {
        setUserData(user);
        setTags(user.tags ?? []);
    }, [user])

    return (
        <div className="p-6 m-10 flex flex-col max-md:items-center">
            <h3 className="m-10 text-xl">Para reflitir as atualizações, por favor faça login novamente</h3>
            {avatar ? <AvatarApp file={avatar} size="128"></AvatarApp> : <AvatarApp user={user} size="128"></AvatarApp>}
            <div className="flex max-md:flex-col max-md:items-center">
                <div className="p-4 m-4">
                    <Form className="items-center" inputs={inputs} useLabelForm={false} appError={error}></Form>
                </div>
                <div className="p-4">
                    <p className="text-md m-4">Coisas que você tem interesse</p>
                    <div className="flex flex-col">
                        <div className="bg-input-bg h-20 p-2 w-fit overflow-y-auto scroll-p-px rounded-md">
                            {tags.length > 0 ? tags?.map(tag => ` #${tag.description}`) : <>
                                <h4>Nada de interessante </h4>
                            </>
                            }
                        </div>
                        <TagSearch tags={tags} setTags={setTags}></TagSearch>
                    </div>
                </div>
            </div>
            <div className="flex p-10">
                <Input error={error} id="passwordToConfirm" name="Confirme a sua senha para efetuar as alterações" type="password" useLabel={false} className="w-full" stateSetter={setPasswordToConfirm}></Input>
                <Button className="w-36 m-2" onClick={handleSubmitUser}>Salvar</Button>
            </div>
            {loading && <Loading></Loading>}
        </div>
    )
}