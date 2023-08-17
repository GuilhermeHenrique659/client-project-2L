
import Tag from "@src/entity/Tag";
import tagRepository from "@src/repository/tag/TagRepository";
import { Dispatch, SetStateAction, useState } from "react";

export default function useTagSearch(tags: Tag[], setTags: Dispatch<SetStateAction<Tag[]>>){
    const [searchInput, setSearchInput] = useState('');
    const [tagResults, setSearchResults] = useState<Tag[]>([]);

    const handleAddTag = (description: string) => {
        if (description.length > 2)
            setTags([...tags, {
                description: description
            }]);
    };

    const handleSearchInput = async (searchTerm: string) => {
        if (searchTerm.length < 2) {
            setSearchInput('');
            return;
        }
        setSearchInput(searchTerm);
        const tags = await tagRepository.searchTag(searchTerm);
        if (tags) {
            setSearchResults(tags);
        }
    }

    return {
        tags,
        tagResults,
        searchInput,
        handleAddTag,
        handleSearchInput,
    }
}