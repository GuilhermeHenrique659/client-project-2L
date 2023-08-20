'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@src/components/atoms/button/Button";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Input from "@src/components/atoms/input/Input";
import tagRepository from "@src/repository/tag/TagRepository";
import Tag from "@src/entity/Tag";
import userRepository from "@src/repository/user/UserRepository";
import AppError from "@src/common/errors/AppError";
import Loading from "@src/components/atoms/loading/Loading";
import InputShowError from "@src/components/atoms/input/InputError";
import useTagSearch from "@src/hooks/tags/TagSearchHook";


export default function RegisterTags() {
    const router = useRouter();
    const [tags, setTags] = useState<Tag[]>([])
    const { searchInput, tagResults, handleAddTag, handleSearchInput } = useTagSearch(tags, setTags);
    const [error, setError] = useState<AppError>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSaveUserTags =async () => {
        if (tags.length > 0){
            setLoading(true);            
            await userRepository.createUserTag(tags, setError);
            setLoading(false);
        }

        router.push('/')
    }

    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Cadastro</h1>
                <h3>O que voce tem interesse ? </h3>
                <div className="flex flex-row items-center align-middle z-10 mb-4">
                    <div className="flex flex-col z-10">
                        <div className="flex items-center align-middle">
                            <Input  id="search" name="" stateSetter={handleSearchInput}></Input>
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
                <div className="flex flex-col items-end">

                    <div className="w-96 p-4 bg-input-bg rounded-md shadow-lg min-h-[75px]  overflow-y-auto">
                        {tags.length > 0 ? tags?.map(tag => ` #${tag.description}`) : <>
                                <h4>Procure itens de seu interesse, se não encontrar adicione</h4>
                        </>}
                    </div>
                </div>
                <div>
                    <Button className="w-32 m-2" onClick={() => router.push('/register/avatar')}>Voltar</Button>
                    {error && <InputShowError>{error.message}</InputShowError>}
                    {loading && <Loading></Loading>}
                    <Button className="w-32 m-2" onClick={handleSaveUserTags}>Salvar</Button>
                </div>
            </div>
        </div>
    )
}