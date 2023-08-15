'use client';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import GoogleSignInButton from '@/components/GoogleSignInButton';

export default function SignInPage() {
    const session = useSession();
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/dashboard');
        }
    });

    async function loginUser(e) {
        e.preventDefault();

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            if (callback?.error) {
                toast.error(callback.error);
            }

            if (callback?.ok && !callback?.error) {
                toast.success(`You've signed in successfully.`);
            }
        });
    }

    return (
        <div className="flex min-h-full w-full overflow-hidden pt-16 sm:py-16">
            <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
                <div className="relative mt-12 sm:mt-16">
                    <h1 className="text-center text-2xl font-medium 
                        tracking-tight text-gray-900">
                        Sign in to your account
                    </h1>
                </div>
                <div className="sm:rounded-5xl -mx-4 mt-10 flex-auto bg-white px-4 py-10 
                    shadow-xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-20">
                    <form onSubmit={loginUser}>
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
                                Sign In
                        </button>
                    </form>
                    <div className="mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 
                        before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 
                        after:block after:h-px after:flex-grow after:bg-stone-400">
                        or
                    </div>
                    <GoogleSignInButton />
                </div>
            </div>
        </div>
    )
}