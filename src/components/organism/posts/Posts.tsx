import Post from "@src/components/molecules/post/Post"

export default function Posts(){
    const list = [1,2,3]
    
    return (
        <div className="flex flex-col w-11/12 items-center justify-around z-0">
            {list.map(item => <Post key={item}></Post>)}
        </div>
    )
}