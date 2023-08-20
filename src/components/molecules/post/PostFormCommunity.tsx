import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTags, faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "@src/components/atoms/button/Button";
import Input from "@src/components/atoms/input/Input";
import InputFile from "@src/components/atoms/input/InputFile";
import TagSearch from "@src/components/molecules/tag/TagSearch";
import { Dispatch, SetStateAction, useState } from "react";
import Tag from "@src/entity/Tag";
import usePostForm from "@src/hooks/form/post/PostFormHook";
import { postSocketRepository } from "@src/events/post/PostSocketRepository";
import { AddPostType } from "@src/events/post/types/AddPostType";
import InputShowError from "@src/components/atoms/input/InputError";
import Loading from "@src/components/atoms/loading/Loading";

interface IPostFormCommunity {
    tags: Tag[];
    setTags: Dispatch<SetStateAction<Tag[]>>;
    communityId: string
}

export default function PostFormCommunity({ tags, setTags, communityId }: IPostFormCommunity) {
    const [showUploadFile, setShowUploadFile] = useState<boolean>(false);
    const [showTags, setShowTags] = useState<boolean>(false);
    const [content, setContent] = useState<string>();
    const { filesBase, error, handleUploadFiles, setError } = usePostForm();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSavePost = async () => {
        setLoading(true);
        const tagsData = tags.map(({ description, id }) => {
            return { description, id }
        })
        await postSocketRepository.save({ content, tags: tagsData, files: filesBase, communityId } as AddPostType, setError);
        setLoading(false)
    }


    return (<>
        <div className="flex items-center max-md:flex-col">
            <Input id="content" name="Conteudo" useLabel={false} className="" stateSetter={setContent}></Input>
            <div className="flex">
                <Button className="w-7 h-7 rounded-full p-0 m-2 " onClick={() => setShowUploadFile(!showUploadFile)}><FontAwesomeIcon icon={faUpload}></FontAwesomeIcon></Button>
                <Button className="w-7 h-7 rounded-full p-0 m-2 " onClick={() => setShowTags(!showTags)}><FontAwesomeIcon icon={faTags}></FontAwesomeIcon></Button>
                <Button className="w-7 h-7 rounded-full p-0 m-2 " onClick={handleSavePost}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></Button>
            </div>
        </div>
        {showUploadFile && <InputFile multiple={true} handleOnChange={handleUploadFiles}></InputFile>}
        {
            tags.length > 0 ? tags?.map(tag => ` #${tag.description}`) : <>
                <h4>Procure abaixo tag relacionadas ao conteudo</h4>
            </>
        }
        {showTags && <TagSearch setTags={setTags} tags={tags}></TagSearch>}
        {error && <InputShowError>{error.message}</InputShowError>}
        {loading && <Loading></Loading>}
    </>
    )
}