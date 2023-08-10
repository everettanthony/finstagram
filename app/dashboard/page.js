'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import MyDropZone from '@/components/MyDropZone';

export default function DashboardPage() {
  const [newAddress, setNewAddress] = useState('');
  const router = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session) setNewAddress(session?.user?.address);
  }, [session]);

  if (!session) {
    redirect('/signin?callbackUrl=/dashboard');
  }

  async function updateUser() {
    await update({
      address: newAddress
    })
    .then((callback) => {
      toast.success(`Your profile was updated successfully.`);
      router.refresh(); 
    })
  }

  return (
    <div className="py-24 w-2/5">
        <div className="container">
          <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
          {session?.user?.name && (
            <p>Welcome back, <strong>{session?.user?.name}</strong>!</p>
          )}

          <div className="user mt-4">
            <div className="user-row mb-4">
              <label className="block font-bold mb-1">Address</label>
              <input 
                type="text" 
                placeholder={session?.user?.address}
                value={newAddress || ''} 
                className="block appearance-none rounded-md border bg-white
                  py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
                  text-gray-900 placeholder:text-gray-400 border-gray-300 
                  focus:border-gray-400 focus:outline-none sm:text-sm w-2/3"
                onChange={(e) => setNewAddress(e.target.value)} 
              />
            </div>

            <div className="user-row mb-4">
              <label className="block font-bold mb-1">Profile Photo</label>
              <MyDropZone />
            </div>

            <div className="user-row mb-4">
              <button className="inline-flex justify-center rounded-md border 
                py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm 
                bg-gray-100 hover:bg-gray-200 border-gray-300
                transition-colors duration-200"
                onClick={updateUser}>
                Update
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}
