'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@src/components/atoms/button/Button";
import Form from "@src/components/molecules/form/Form";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Input from "@src/components/atoms/input/Input";
import User from "@src/entity/User";


export default function RegisterTags({ searchParams }: { searchParams: { userId: string}}) {
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const handleAddTag = (tag: string) => {
        setTags([...tags, tag])
    };


    useEffect(() => {
        if (searchInput) {
            setSearchResults(['teste', 'teste2', 'teste3'])
        }
    }, [searchInput])

    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-2/4 sm:w-full sm:h-full">
                <h1 className="text-lg">Cadastro</h1>
                <h3>O que voce tem interesse ? </h3>
                <div className="flex flex-row items-center align-middle z-10 mb-4">
                    <div className="flex flex-col z-10">
                        <div className=" flex">
                            <Input className="p-2" id="search" name="" stateSetter={setSearchInput}></Input>
                            <Button className="flex items-center" onClick={() => handleAddTag(searchInput)}><FontAwesomeIcon className="p-2" icon={faAdd}></FontAwesomeIcon></Button>
                        </div>
                        <div className=" bg-input-bg h-20 overflow-y-scroll scroll-p-px w-64 rounded-md z-10">
                            <div className="flex flex-col divide-y divide-gray-400">
                                {searchResults.map(result => {
                                    return (
                                        <div className=" text-md p-2 hover:bg-slate-400 cursor-pointer" onClick={() => handleAddTag(result)}>
                                            {result}
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">

                    <div className="w-96 p-4 bg-input-bg rounded-md shadow-lg min-h-[75px] overflow-y-scroll">
                        {tags.length > 0 ? tags?.map(tag => ` #${tag}`) : <>
                                <h4>Procure itens de seu interesse, se não encontrar adcione</h4>
                        </>}
                    </div>
                </div>
                <div>
                    <Button className="w-32" onClick={() => router.push('/register/avatar')}>Voltar</Button>
                    <Button className="w-32" onClick={() => console.log('proximo')}>Proximo</Button>
                </div>
            </div>
        </div>
    )
}