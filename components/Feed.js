'use client';
import { useSession } from 'next-auth/react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

export default function Feed() {  
    const { data: session } = useSession();
    
    return (
        <section className={`grid ${session ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"}  `}>
            <div className="posts md:col-span-2">
                <Stories />
                <Posts />
            </div>
            <div className="profile hidden md:inline-grid md:col-span-1">
                <div className="fixed w-[380px]">
                    <MiniProfile />
                    <Suggestions />
                </div>
            </div>
        </section>
    )
}