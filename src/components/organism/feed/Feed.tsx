import FeedBar from "@src/components/molecules/FeedBar/FeedBar";
import TooBar from "@src/components/molecules/ToolBar/ToolBar";
import Posts from "../posts/Posts";



export default function Feed() {
    return (
        <div className="w-3/4 h-fit max-md:w-full max-md:h-full rounded-md shadow-xl bg-cnt-dark flex flex-col items-center justify-center p-6">
            <FeedBar></FeedBar>
            <TooBar></TooBar>
            <Posts></Posts>
        </div>
    )
}