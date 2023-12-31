import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin?callbackUrl=/profile')
    }

    return (
        <div className="py-24">
            <div className="container">
                <h1 className="text-2xl font-bold">User Profile</h1>
            </div>
        </div>
    )
}