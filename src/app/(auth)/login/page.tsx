'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [heading, setHeading] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const fullHeading = "Welcome Back";

    useEffect(() => {
        let i = 0;
        const typeWriter = () => {
            if (i < fullHeading.length) {
                setHeading(fullHeading.substring(0, i + 1));
                i++;
                setTimeout(typeWriter, 70);
            }
        };
        typeWriter();
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                // Check if user is authenticated
                const session = await getSession();
                if (session) {
                    router.push('/dashboard');
                }
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center p-4">
            <a href="/" className="mb-8 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10">
                <Image src="/images/LogynPay.png" alt="LogynPay Logo" width={128} height={32} className="h-10 w-auto" />
            </a>
            <div className="w-full max-w-md z-10">
                <div className="glass-effect rounded-2xl shadow-lg p-8 sm:p-10">
                    <div className="text-center text-white mb-8">
                        <h1 className="text-3xl font-bold mb-2 h-10">{heading}</h1>
                        <p className="text-white/70">Login to manage your payments</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <i className="ri-mail-line absolute top-1/2 -translate-y-1/2 left-4 text-white/50"></i>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300" 
                            />
                        </div>

                        <div className="relative fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <i className="ri-lock-password-line absolute top-1/2 -translate-y-1/2 left-4 text-white/50"></i>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                            />
                            <i
                                id="password-toggle"
                                className={`absolute top-1/2 -translate-y-1/2 right-4 text-white/50 cursor-pointer hover:text-white transition-colors ${passwordVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>

                        <div className="flex justify-between items-center text-xs text-white/70 fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="h-4 w-4 bg-transparent border-white/40 rounded text-green-500 focus:ring-green-500" />
                                Remember me
                            </label>
                            <Link href="#" className="text-green-400 hover:underline transition-colors">Forgot password?</Link>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <div className="fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-white/50 text-xs fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <hr className="flex-grow border-t border-white/20" />
                            <span>or continue with</span>
                            <hr className="flex-grow border-t border-white/20" />
                        </div>

                        <div className="flex gap-4 fade-in-up" style={{ animationDelay: '0.7s' }}>
                            <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-lg border border-white/20 hover:bg-white/20 transition duration-300">
                                <i className="ri-google-fill"></i> Google
                            </button>
                            <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-lg border border-white/20 hover:bg-white/20 transition duration-300">
                                <i className="ri-facebook-fill"></i> Facebook
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-white/70 mt-8 fade-in-up" style={{ animationDelay: '0.8s' }}>
                        Don't have an account? <Link href="/register" className="font-bold text-green-400 hover:underline transition-colors">Sign Up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;