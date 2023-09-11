import AvatarApp from "@src/components/atoms/avatar/AvatarApp";
import Cover from "@src/components/atoms/community/Cover";
import Input from "@src/components/atoms/input/Input";
import InputFile from "@src/components/atoms/input/InputFile";
import Community from "@src/entity/Community"
import { useState } from "react"
import TagSearch from "../tag/TagSearch";
import Tag from "@src/entity/Tag";
import useCommunityForm from "@src/hooks/form/community/CommunityForm";
import Form from "../form/Form";
import InputShowError from "@src/components/atoms/input/InputError";
import Loading from "@src/components/atoms/loading/Loading";
import Button from "@src/components/atoms/button/Button";
import { IFormProps } from "@src/common/interface/IFormProps";
import communityRepository from "@src/repository/community/CommunityRepository";
import { useRouter } from "next/navigation";


export default function CommunityForm({ setShowForm, setData }: IFormProps<Community[]>) {
    const router = useRouter();
    const { inputs, setError, handleUploadCover, avatar, name, cover, error, description } = useCommunityForm()
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);


    const handleSaveCommunity = async () => {
        setLoading(true);
        const community = await communityRepository.save({ name, tags, avatar, cover, description } as Community, setError);
        setLoading(false);

        if (community) {
            setData((currentData) => [community, ...currentData])
            router.push(`/community?communityId=${community.id}`)
        }
    }

    return (
        <div className="flex flex-col w-full p-4 border-b">
            {cover ? <Cover file={cover}></Cover> : <InputFile handleOnChange={handleUploadCover}></InputFile>}
            <div className="flex justify-between">
                <div className="flex flex-col justify-start p-4">
                    <div className="flex max-md:flex-col items-start">
                        <AvatarApp file={avatar} size="64"></AvatarApp>
                        <div>
                            <Form className="items-start" inputs={inputs}></Form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start">
                <div className="bg-input-bg h-20 overflow-y-auto scroll-p-px rounded-md z-10 p-3">
                    {tags.length > 0 ? tags?.map(tag => ` #${tag.description}`) : <>
                        <h4>Procure abaixo tag relacionadas ao conteudo</h4>
                    </>
                    }
                </div>
                <TagSearch tags={tags} setTags={setTags}></TagSearch>
            </div>

            {error && <InputShowError>{error.message}</InputShowError>}
            {loading ? <Loading></Loading> : <div className="flex">
                <Button className="w-36 m-2" onClick={handleSaveCommunity}>Salvar</Button>
                <Button className="w-36 m-2" onClick={setShowForm}>Cancelar</Button>
            </div>}
        </div>
    )
}