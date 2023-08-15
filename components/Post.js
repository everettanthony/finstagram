'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
  } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';
import { BookmarkIcon, ChatBubbleLeftIcon, FaceSmileIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconFilled } from '@heroicons/react/24/solid';

export default function Post({ img, profileImg, caption, username, id }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [bookMarked, setBookMarked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const unsubscribe = onSnapshot(
          query(
            collection(db, 'posts', id, 'comments'),
            orderBy('timestamp','desc')
          ),
          (snapshot) => {
            setComments(snapshot.docs);
          }
        );
    }, [db, id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
          collection(db, 'posts', id, 'likes'),
          (snapshot) => setLikes(snapshot.docs)
        );
    }, [db]);

    useEffect(() => {
        setHasLiked(
          likes.findIndex((like) => like.id === session?.user?.id) !== -1
        );
    }, [likes]);

    async function likePost() {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.id));
            setHasLiked(false);
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session?.user?.id), {
              username: session?.user?.name,
            });
            setHasLiked(true);
        }
    }

    async function sendComment(event) {
        event.preventDefault();
        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user?.name,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });
    }

    function bookMark() {
        setBookMarked(!bookMarked);
    }

    return (
        <div className="bg-white my-7 border rounded-md pb-2">
            <div className="flex items-center p-5">
                <img
                    className="h-12 rounded-full object-cover border p-1 mr-3"
                    src={profileImg}
                    alt={username}
                />
                <p className="font-bold flex-1">{username}</p>
            </div>

            <img className="object-cover w-full" src={img} alt="Image" />

            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {hasLiked ? (
                            <HeartIconFilled
                                onClick={likePost}
                                className="btn"
                            />
                        ) : (
                            <HeartIcon onClick={likePost} className="btn" />
                        )}

                        <ChatBubbleLeftIcon className="btn" />
                    </div>
                    {bookMarked ? (
                        <BookmarkIconFilled
                            onClick={bookMark}
                            className="btn"
                        />
                    ) : (
                        <BookmarkIcon onClick={bookMark} className="btn" />
                    )}
                </div>
            )}

            <div className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} like{likes.length > 1 && 's'}</p>
                )}
                <span className="font-bold mr-2">{username}</span>
                {caption}
            </div>

            {comments.length > 0 && (
                <div className="mx-8 max-h-24 overflow-y-scroll scrollbar-none">
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mb-2">
                            <img
                                className="h-7  rounded-full object-cover"
                                src={comment.data().userImage}
                                alt="user-image" />
                            <p className="font-semibold">{comment.data().username}</p>
                            <p className="flex-1 truncate">{comment.data().comment}</p>
                            <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))}
                    Comments
                </div>
            )}

            {session && (
                <form className="flex items-center p-4">
                    <FaceSmileIcon className="h-7" />
                    <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        className="border-none flex-1 pl-2 outline-none focus:placeholder-transparent"
                        type="text"
                        placeholder="Enter your comment..."
                    />
                    <button
                        type="submit"
                        onClick={sendComment}
                        disabled={!comment.trim()}
                        className="text-orange-500 font-bold disabled:text-orange-200">
                        Send
                    </button>
                </form>
            )}
        </div>
    )
}