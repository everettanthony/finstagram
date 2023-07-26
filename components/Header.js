import Link from 'next/link';
import SignInButton from './SignInButton';

export default function Header() {
    return (
        <header className="flex h-24 flex-col items-center justify-center bg-stone-100">
            <nav className="container">
                <ul className="flex items-center justify-between 
                    gap-8 font-medium tracking-wider text-stone-500">
                    <li className="text-sm">
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='text-sm'>
                        <Link href='/admin/server'>Admin (server)</Link>
                    </li>
                    <li className='text-sm'>
                        <Link href='/admin/client'>Admin (client)</Link>
                    </li>
                    <li>
                        <SignInButton />
                    </li>
                </ul>
            </nav>
        </header>
    )
}