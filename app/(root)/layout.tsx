import { isAuthenticated, signOut } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { LogOut, User, BarChart2 } from 'lucide-react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
        redirect('/sign-in');
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <nav className='flex justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-blue-100/50'>
                <Link href={'/'} className='flex items-center gap-3 transition-transform hover:scale-105'>
                    <div className='bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-2 shadow-md'>
                        <Image src='/logo.svg' width={28} height={28} alt={'logo'} className='animate-pulse' />
                    </div>
                    <h2 className='font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>InterviewPal</h2>
                </Link>
                <div className='flex items-center gap-4'>
                    <Link href="/profile" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2 rounded-full hover:bg-indigo-50">
                        <User size={18} />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>
                    <Link href="/analytics" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2 rounded-full hover:bg-indigo-50">
                        <BarChart2 size={18} />
                        <span className="hidden sm:inline">Analytics</span>
                    </Link>
                    <form action={signOut}>
                        <button type='submit' className='flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all'>
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </form>
                </div>
            </nav>
            <main className='mt-10'>
                {children}
            </main>
        </div>
    )
}

export default RootLayout