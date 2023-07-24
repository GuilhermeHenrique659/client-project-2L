'use client'
import Navbar from "@src/components/molecules/navbar/Navbar";
import Feed from "@src/components/organism/feed/Feed";


export default function Index() {
    return (
        <>
            <Navbar></Navbar>
            <div className="flex justify-center mt-10 ">
                <Feed></Feed>
            </div>
        </>
    )
}