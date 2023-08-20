import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@src/components/atoms/button/Button"
import Input from "@src/components/atoms/input/Input"
import Tag from "@src/entity/Tag";
import useTagSearch from "@src/hooks/tags/TagSearchHook";
import { Dispatch, SetStateAction } from "react";

interface ITagSearchProps {
    tags: Tag[],
    setTags: Dispatch<SetStateAction<Tag[]>>,
}

export default function TagSearch({ tags, setTags}: ITagSearchProps) {
    const { searchInput, tagResults, handleAddTag, handleSearchInput } = useTagSearch(tags, setTags);
    
    return (
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
    )
}