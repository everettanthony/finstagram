import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  return (
    <div className="py-24">
        <div className="container">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            {session?.user?.name && (
              <p>Welcome back, <strong>{session?.user?.name}</strong></p>
            )}
        </div>
    </div>
  )
}
