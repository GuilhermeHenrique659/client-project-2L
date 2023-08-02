'use client'
 
import { useSearchParams } from 'next/navigation'
import Navbar from "@src/components/molecules/navbar/Navbar";
import FeedCommunity from '@src/components/organism/feed/FeedCommunity';

export default function Community() {
    const searchParams = useSearchParams()
 
    const communityId = searchParams.get('communityId') as string;
    return (
        <>
        <Navbar></Navbar>
        <div className="flex justify-center mt-10 ">
            <FeedCommunity communityId={communityId}></FeedCommunity>
        </div>
    </>
    )
}