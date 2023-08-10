'use client';
import { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useRecoilState } from 'recoil';
import Story from './Story';

export default function Stories() {
    const [storyeUsers, setStoryUsers] = useState([]);

    useEffect(() => {
        const storyUsers = minifaker.array(20, (i) => ({
          username: minifaker.username({ locale: 'en' }).toLowerCase(),
          img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
          id: i,
        }));

        setStoryUsers(storyUsers);
     }, []);

    return (
        <div className="flex space-x-2 p-6 bg-white border-gray-200 
            border overflow-x-scroll rounded-sm scrollbar-none">
            {storyeUsers.map((user) => (
                <Story key={user.id} username={user.username} img={user.img} />
            ))}
        </div>
    )
}