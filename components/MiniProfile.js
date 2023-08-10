'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function MiniProfile() {
    const { data: session } = useSession();

    return (
        <div>
            {session && (
                <div  className="flex items-center justify-between mt-7 ml-10">
                    {session?.user?.image ? (
                        <div className="relative h-10 w-10">
                            <Image
                                src={session.user.image}
                                alt={session.user.name}
                                className="inline-block rounded-full"
                                width={58}
                                height={58}
                            />
                        </div>
                    ) : ( 
                        <span className="inline-block h-[50px] w-[50px] overflow-hidden rounded-full bg-stone-100">
                            <svg
                                className="h-full w-full text-stone-300"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 
                                2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                    )}
                    <div className="flex-1 ml-4">
                        <h2 className="font-bold">{session.user.name}</h2>
                        <h3 className="text-sm text-gray-400">Welcome to Finstagram</h3>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="font-semibold text-orange-500 text-sm">
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}