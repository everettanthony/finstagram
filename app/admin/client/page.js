'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ClientProtectedPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/signin?callbackUrl=/admin/client')
        }
    });

    return (
        <div className="py-24">
            <div className="container">
                <h1 className="text-2xl font-bold">Admin Protected <span className="text-[#0F9D58]">Client-Side</span> Page</h1>
                <p>You are logged in as <strong>{session?.user?.name}</strong></p>
            </div>
        </div>
    )
}