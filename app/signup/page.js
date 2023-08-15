'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';

// Sign up to site using Firebase email/password authentication
export default function SignUpPage() {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    async function signUp(e) {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed Up 
            const userInfo = userCredential.user;
            console.log('New User', `${userInfo}`);
            toast.success(`You're all signed up.`);
            router.push('/signin');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error', `${errorCode}: ${errorMessage}`);
            toast.error(`${errorCode}: ${errorMessage}`);
        });
    }

    return (
        <div className="flex min-h-full w-full overflow-hidden pt-16 sm:py-16">
            <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
                <div className="relative mt-12 sm:mt-16">
                    <h1 className="text-center text-2xl font-medium 
                        tracking-tight text-gray-900">
                        Sign Up for an Account
                    </h1>
                </div>
                <div className="sm:rounded-5xl -mx-4 mt-10 flex-auto bg-white px-4 py-10 
                    shadow-xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-20">
                    <form onSubmit={signUp} autoComplete="off">
                        <div className="space-y-2 mb-3">
                            <label className="block font-bold mb-3">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                className="block w-full appearance-none rounded-md border bg-white
                                    py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
                                    text-gray-900 placeholder:text-gray-400 border-gray-300 
                                    focus:border-gray-400 focus:outline-none sm:text-sm"
                                required 
                            />
                        </div>
                        <div className="space-y-2 mb-3">
                            <label className="block font-bold mb-3">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={data.password}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                className="block w-full appearance-none rounded-md border bg-white
                                    py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
                                    text-gray-900 placeholder:text-gray-400 border-gray-300 
                                    focus:border-gray-400 focus:outline-none sm:text-sm"
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="inline-flex justify-center rounded-md border 
                                py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm 
                                bg-gray-100 hover:bg-gray-200 border-gray-300
                                transition-colors duration-200 mt-3 w-full">
                                Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}