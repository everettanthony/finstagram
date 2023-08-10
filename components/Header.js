import Link from 'next/link';
import SignInButton from './SignInButton';
import Logo from './Logo';
import Search from './Search';

export default function Header() {
    return (
        <header className="hdr flex h-24 items-center justify-between px-10 bg-white border-b-2 border-b-gray-200">
            <Link href="/"><Logo width={140} height={30} /></Link>
            <Search />
            <SignInButton />
        </header>
    )
}