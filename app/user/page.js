'use client';
import { useRouter, redirect } from 'next/navigation';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function UserPage() {
    const user = auth.currentUser;
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log('UID', uid);
          // ...
        } else {
          // User is signed out
          console.log('Signed Out');
          router.push('/firebaseSignIn');
        }
    });

    console.log('Firebase Signed IN User', user);

    return (
      <div className="py-24">
        <div className="container">
            <h1 className="text-2xl font-bold">Firebase User Protected <span className="text-[#0F9D58]">Client-Side</span> Page</h1>
            <p>You are logged in as <strong>{user.email}</strong></p>
        </div>
      </div>
    )
}