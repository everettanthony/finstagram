'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        );
        return unsubscribe;
    }, [db]); 

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    profileImg={post.data().profileImg}
                    img={post.data().image}
                    caption={post.data().caption}
                />
            ))}
        </div>
    )
}