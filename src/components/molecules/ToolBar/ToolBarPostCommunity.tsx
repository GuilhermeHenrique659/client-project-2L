import { Dispatch, SetStateAction, useState } from "react";
import PostForm from "../post/PostForm";
import Post from "@src/entity/Post";
import TooBarButton from "@src/components/atoms/toolbarButton/TooBarButton";
import CommunityForm from "../community/CommunityForm";


export default function TooBarCommunityForm() {
    const [showPostForm, setShowPostForm] = useState<boolean>(false);

    const handleShowPostForm = () => {
        if(showPostForm)
            setShowPostForm(false);
        else
            setShowPostForm(true);
    }

    return (
        <div className="my-6 mb-20 w-6/12 flex flex-col items-center max-md:w-full">
            <div className="h-10 w-96 rounded-md shadow-lg bg-button-color flex justify-center items-center">
                <TooBarButton handleAddButton={handleShowPostForm}></TooBarButton>
            </div>
            <div className={`h-fit w-full border mt-4 shadow-lg rounded-md z-10 origin-top-right ${!showPostForm && 'hidden'}`}role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <CommunityForm ></CommunityForm>
            </div>
        </div>
    )
}