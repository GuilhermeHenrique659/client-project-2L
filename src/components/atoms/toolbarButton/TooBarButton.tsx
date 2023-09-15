import { faCirclePlus, faHouse, faUser, faNoteSticky, faUsers, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

interface ITooBarButtonProps {
    handleAddButton: () => void;
}

export default function TooBarButton(props: ITooBarButtonProps) {
    const router = useRouter();

    return (
        <div>
            <button className="p-4 mx-1">
                <FontAwesomeIcon size="2xl" icon={faBell} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1" onClick={() => router.push('/')}>
                <FontAwesomeIcon size="2xl" icon={faHouse} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1" onClick={props.handleAddButton}>
                <FontAwesomeIcon size="2xl" icon={faCirclePlus} style={{ color: "#00A6ED" }} ></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1">
                <FontAwesomeIcon size="2xl" icon={faUser} onClick={() => router.push('/user/following')} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1" onClick={() => router.push('/user/community')}>
                <FontAwesomeIcon size="2xl" icon={faUsers} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
        </div>
    )
}