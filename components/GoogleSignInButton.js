'use client';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function GoogleSignInButton() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    return (
        <button 
            className="items-center inline-flex justify-center rounded-md border text-white
                py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm 
                bg-[#4285F4] hover:bg-[#3c7de6] border-[#3b7be2]
                transition-colors duration-200 w-full"
                onClick={() => signIn('google', { callbackUrl })}>
            <svg
                aria-hidden='true'
                focusable='false'
                data-icon='google'
                className='mr-3 w-4'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 488 512'>
                <path
                    fill='white'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 
                    248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 
                    86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 
                    12.7 3.9 24.9 3.9 41.4z'
                ></path>
            </svg>
            Sign In With Google
        </button>
    )
}