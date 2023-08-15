import { NextResponse } from 'next/server';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body.data;

    if (!email || !password) {
        return new NextResponse('You are missing an email or password.', { status: 400 });
    }

    const user = createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const userInfo = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error', `${errorCode}: ${errorMessage}`);
        });

    return NextResponse.json(user);
}