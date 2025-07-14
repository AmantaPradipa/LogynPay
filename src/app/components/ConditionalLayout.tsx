'use client';

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const AuthButtons = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard" className="px-5 py-2.5 font-semibold rounded-lg hover:bg-white/10 transition-colors">Dashboard</Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-0.5"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/login" className="px-5 py-2.5 font-semibold rounded-lg hover:bg-white/10 transition-colors">Login</Link>
      <Link href="/register" className="px-5 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-0.5">Sign Up</Link>
    </div>
  );
};

const AuthButtonsMobile = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Link href="/dashboard" className="flex-1 text-center px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10">Dashboard</Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex-1 text-center px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" className="flex-1 text-center px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10">Login</Link>
      <Link href="/register" className="flex-1 text-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">Sign Up</Link>
    </>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 py-4 glass-effect shadow-lg" data-aos="fade-down">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          <Image 
            src="/images/LogynPay.png" 
            alt="LogynPay Logo" 
            width={150} 
            height={40} 
            className="h-8 w-auto"
          />
        </Link>
        
        <button id="mobile-menu-button" className="md:hidden text-white" aria-label="Toggle mobile menu">
          <i className="ri-menu-line text-2xl"></i>
        </button>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
          <Link href="/#features" className="hover:text-green-400 transition-colors">Features</Link>
          <Link href="/#pricing" className="hover:text-green-400 transition-colors">Pricing</Link>
          <Link href="/#testimonials" className="hover:text-green-400 transition-colors">Testimonials</Link>
          <Link href="/#faq" className="hover:text-green-400 transition-colors">FAQ</Link>
        </nav>
        <AuthButtons />
      </div>
      
      <div id="mobile-menu" className="hidden md:hidden py-4 px-2 glass-effect rounded-lg shadow-xl mt-2 absolute top-full left-4 right-4">
        <div className="flex flex-col space-y-3">
          <Link href="/" className="px-4 py-2 rounded-lg hover:bg-white/10">Home</Link>
          <Link href="/#features" className="px-4 py-2 rounded-lg hover:bg-white/10">Features</Link>
          <Link href="/#pricing" className="px-4 py-2 rounded-lg hover:bg-white/10">Pricing</Link>
          <Link href="/#testimonials" className="px-4 py-2 rounded-lg hover:bg-white/10">Testimonials</Link>
          <Link href="/#faq" className="px-4 py-2 rounded-lg hover:bg-white/10">FAQ</Link>
          <div className="flex space-x-3 pt-2">
            <AuthButtonsMobile />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="pt-16 pb-8">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Link href="/" className="text-2xl font-bold tracking-wider mb-6 inline-block">
            <Image 
              src="/images/LogynPay.png" 
              alt="LogynPay Logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-white/60 mb-6 max-w-md">Transform your payment processing with our secure, reliable, and feature-rich platform designed for businesses of all sizes.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white/60 hover:text-white transition-colors"><i className="ri-facebook-fill text-xl"></i></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><i className="ri-twitter-fill text-xl"></i></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><i className="ri-linkedin-fill text-xl"></i></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><i className="ri-instagram-line text-xl"></i></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg text-white mb-6">Product</h4>
          <ul className="space-y-3">
            <li><Link href="/#features" className="text-white/60 hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Integrations</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg text-white mb-6">Resources</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Documentation</Link></li>
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Support</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg text-white mb-6">Company</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/50 text-sm">© 2025 LogynPay. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="relative z-10">
      {!isAuthPage && !isDashboard && <Header />}
      {children}
      {!isAuthPage && !isDashboard && <Footer />}
    </div>
  );
}