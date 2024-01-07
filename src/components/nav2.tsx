import Link from 'next/link';
import Image from 'next/image';
import logo from '../img/logo.svg'


export const Nav2: React.FC  = () => { 
    return(
        <header className="relative z-10 bg-white ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
            <div className="w-full flex items-center justify-center py-4">
            <Link 
                href="/"
                aria-label="WowBlog"
                title="WowBlog"
                className="inline-flex items-center"
            >
                <div >
                    <h1><Image src={logo} alt="logo" className='w-96'/></h1>
                </div>
            </Link>
            </div>
        </header>
    )
}

export default Nav2