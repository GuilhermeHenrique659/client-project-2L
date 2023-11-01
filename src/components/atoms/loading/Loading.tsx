import { ThreeDots } from "react-loader-spinner";

interface ILoadingProps {
    color?: string
}

export default function Loading(props: ILoadingProps) {
    return (
        <ThreeDots color={props.color ?? "#D9D9D9"}></ThreeDots>
    )
}