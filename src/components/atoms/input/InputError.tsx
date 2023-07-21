import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";


export default function InputShowError(props: PropsWithChildren){
    return (
        <span className="text-red-600 text-sm"><FontAwesomeIcon icon={faCircleExclamation} className="pr-2" />{props.children}</span>
    )
}