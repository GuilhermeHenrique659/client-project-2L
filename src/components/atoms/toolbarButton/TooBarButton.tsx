import { faCirclePlus, faHouse, faUser, faNoteSticky, faUsers, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { postSocketRepository } from "@src/events/post/PostSocketRepository";

interface ITooBarButtonProps {
    handleAddButton: () => void;
    handleNotifcationButton: () => void;
    notificationCount: number
}

export default function TooBarButton(props: ITooBarButtonProps) {
    const router = useRouter();

    return (
        <div>
            <button className=" mx-1" onClick={props.handleNotifcationButton}>
                <FontAwesomeIcon size="2xl" icon={faBell} style={{ color: "#13070C" }}></FontAwesomeIcon>
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center -ml-3 -mt-2 text-xs">
                    {props.notificationCount}
                </span>
            </button>
            <button className="p-4 mx-1" onClick={props.handleAddButton}>
                <FontAwesomeIcon size="2xl" icon={faCirclePlus} style={{ color: "#00A6ED" }} ></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1" onClick={() => router.push('/')}>
                <FontAwesomeIcon size="2xl" icon={faHouse} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
            {/* <button className="p-4 mx-1">
                <FontAwesomeIcon size="2xl" icon={faUser} onClick={() => router.push('/user/following')} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button>
            <button className="p-4 mx-1" onClick={() => router.push('/user/community')}>
                <FontAwesomeIcon size="2xl" icon={faUsers} style={{ color: "#13070C" }}></FontAwesomeIcon>
            </button> */}
        </div>
    )
}