import { useState } from "react";
import Button from "@src/components/atoms/button/Button";
import postRepository from "@src/repository/post/PostRepository";
import Post from "@src/entity/Post";
import Loading from "@src/components/atoms/loading/Loading";
import InputShowError from "@src/components/atoms/input/InputError";
import usePostForm from "@src/hooks/form/post/PostFormHook";
import { IFormProps } from "@src/common/interface/IFormProps";
import TagSearch from "../tag/TagSearch";
import Tag from "@src/entity/Tag";
import InputFile from "@src/components/atoms/input/InputFile";


export default function PostForm({ setShowForm, setData }: IFormProps<Post[]>) {
    const [tags, setTags]= useState<Tag[]>([]);
    const { content, filesBase, error, handleContent, handleUploadFiles, setError } = usePostForm();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSavePost = async () => {
        setLoading(true);        
        const post = await postRepository.save({ content, tags, files: filesBase } as Post, setError);
        setLoading(false);

        if(post){
            setShowForm();
            setData((currentPost) => [post, ...currentPost]);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-md">
            <span className="p-2 m-2">Coloque o texto para compartilhar</span>
            <textarea className="bg-input-bg rounded-t-md w-4/5 p-3 shadow-lg resize-none" onChange={handleContent} rows={8}></textarea>
            <div className="bg-input-bg rounded-b-md mb-2 w-4/5 p-3 shadow-lg resize-none">
                {tags.length > 0 ? tags?.map(tag => ` #${tag.description}`) : <>
                    <h4>Procure abaixo tag relacionadas ao conteudo</h4>
                </>
                }
            </div>
            <div className="flex flex-col-reverse items-center justify-center">
                <InputFile multiple={true} handleOnChange={handleUploadFiles}></InputFile>
                <TagSearch setTags={setTags} tags={tags}></TagSearch>
            </div>
            {error && <InputShowError>{error.message}</InputShowError>}
            {loading ? <Loading></Loading> : <div className="flex">
                <Button className="w-36 m-2" onClick={handleSavePost}>Salvar</Button>
                <Button className="w-36 m-2" onClick={setShowForm}>Cancelar</Button>
            </div>}
        </div>
    )
}