import { faCirclePlus, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PostForm from "../post/PostForm";
import { useRouter } from "next/navigation";


export default function TooBar() {
    const router = useRouter();
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
                <button className="p-4 mx-1" onClick={() => router.push('/')}>
                    <FontAwesomeIcon size="2xl" icon={faHouse} style={{ color: "#13070C" }}></FontAwesomeIcon>
                </button>
                <button className="p-4 mx-1" onClick={handleShowPostForm}>
                    <FontAwesomeIcon size="2xl" icon={faCirclePlus} style={{ color: "#00A6ED" }} ></FontAwesomeIcon>
                </button>
                <button className="p-4 mx-1">
                    <FontAwesomeIcon size="2xl" icon={faUser} style={{ color: "#13070C" }}></FontAwesomeIcon>
                </button>
            </div>
            <div className={`h-fit w-full border mt-4 shadow-lg rounded-md z-10 origin-top-right ${!showPostForm && 'hidden'}`}role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <PostForm showPostForm={handleShowPostForm}></PostForm>
            </div>
        </div>
    )
}