import { Dispatch, SetStateAction, useState } from "react";
import Input from "@src/components/atoms/input/Input";
import Button from "@src/components/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import postRepository from "@src/repository/post/PostRepository";
import Post from "@src/entity/Post";
import Loading from "@src/components/atoms/loading/Loading";
import InputShowError from "@src/components/atoms/input/InputError";
import useTagSearch from "@src/hooks/tags/TagSearchHook";
import usePostForm from "@src/hooks/form/post/PostFormHook";

interface IPostFormProps {
    showPostForm: () => void;
    setPosts: Dispatch<SetStateAction<Post[]>>
}

export default function PostForm({ showPostForm, setPosts }: IPostFormProps) {
    const { tags, searchInput, tagResults, handleAddTag, handleSearchInput } = useTagSearch();
    const { content, filesBase, error, handleContent, handleUploadFiles, setError } = usePostForm();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSavePost = async () => {
        setLoading(true);        
        const post = await postRepository.save({ content, tags, files: filesBase } as Post, setError);
        setLoading(false);

        if(post){
            showPostForm();
            setPosts((currentPost) => [post, ...currentPost]);
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
                <input type="file" className="w-80 m-2" name="" id="" multiple onChange={handleUploadFiles} />

                <div className="flex flex-col mb-2">
                    <div className="flex items-center align-middle">
                        <Input id="search" name="" stateSetter={handleSearchInput}></Input>
                        <Button className="flex items-center" onClick={() => handleAddTag(searchInput)}><FontAwesomeIcon className="p-2" icon={faAdd}></FontAwesomeIcon></Button>
                    </div>
                    <div className=" bg-input-bg h-20 overflow-y-auto scroll-p-px w-64 rounded-md z-10">
                        <div className="flex flex-col divide-y divide-gray-400">
                            {tagResults.map(result => {
                                return (
                                    <div key={result.id} className=" text-md p-2 hover:bg-slate-400 cursor-pointer" onClick={() => handleAddTag(result.description)}>
                                        {result.description}
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {error && <InputShowError>{error.message}</InputShowError>}
            {loading ? <Loading></Loading> : <div className="flex">
                <Button className="w-36" onClick={handleSavePost}>Salvar</Button>
                <Button className="w-36" onClick={showPostForm}>Cancelar</Button>
            </div>}
        </div>
    )
}