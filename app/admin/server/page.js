import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ServerProtectedPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin?callbackUrl=/admin/server')
    }

    return (
        <div className="py-24">
            <div className="container">
                <h1 className="text-2xl font-bold">Admin Protected <span className="text-[#4285F4]">Server</span> Page</h1>
                <p>You are logged in as <strong>{session?.user?.name}</strong></p>
            </div>
        </div>
    )
}