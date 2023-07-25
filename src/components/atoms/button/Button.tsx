import { PropsWithChildren, useState } from "react";

type ButtonProps = {
    onClick: () => void;
    isError?: boolean;
    className: string;
    disabled?: boolean;
}

export default function Button(props: PropsWithChildren<ButtonProps>){
    const [animate, setAnimate] = useState<boolean>(false);
    
    const handleMouseEnter = () => {
        setAnimate(true);
    };
    
    const handleMouseLeave = () => {
        setAnimate(false);
    };

    return (
        <div className="p-2 m-2" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <button onClick={props.onClick}
                className={`bg-button-color text-slate-800 h-7 shadow-lg rounded-md items-center cursor-pointer ${(props.isError && animate) ? 'border border-red-600 animate-shake ': ''}` + props.className} 
                disabled={props.disabled}>
                    {props.children}
            </button>
        </div>
    )
}