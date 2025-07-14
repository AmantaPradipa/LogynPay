'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10 p-3 sm:p-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/images/LogynPay.png" alt="LogynPay Logo" width={128} height={32} className="h-6 sm:h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
                {session?.user?.email && (
                    <span className="text-white/80 text-xs sm:text-sm hidden md:block max-w-[120px] lg:max-w-none truncate">
                        Welcome, {session.user.email}
                    </span>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-xs sm:text-sm font-medium shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                    <span className="hidden sm:inline">Sign Out</span>
                    <span className="sm:hidden">
                        <i className="ri-logout-box-line text-sm"></i>
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;