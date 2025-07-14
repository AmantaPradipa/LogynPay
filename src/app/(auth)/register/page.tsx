'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [heading, setHeading] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const fullHeading = "Create New Account";

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

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Logging you in...');
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.ok) {
          // Redirect to dashboard on successful login
          router.push('/dashboard');
        } else {
          // Handle auto-login failure
          setError('Registration successful, but auto-login failed. Please log in manually.');
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } else {
        setError(data.error || 'An error occurred during registration');
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
            <p className="text-white/70">Sign up to start your payment journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
              <i className="ri-user-line absolute top-1/2 -translate-y-1/2 left-4 text-white/50"></i>
              <input 
                type="text" 
                name="fullname" 
                placeholder="Full Name" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300" 
              />
            </div>

            <div className="relative fade-in-up" style={{ animationDelay: '0.3s' }}>
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

            <div className="relative fade-in-up" style={{ animationDelay: '0.4s' }}>
              <i className="ri-lock-password-line absolute top-1/2 -translate-y-1/2 left-4 text-white/50"></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              />
              <i
                id="password-toggle"
                className={`absolute top-1/2 -translate-y-1/2 right-4 text-white/50 cursor-pointer hover:text-white transition-colors ${passwordVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="relative fade-in-up" style={{ animationDelay: '0.5s' }}>
              <i className="ri-lock-password-line absolute top-1/2 -translate-y-1/2 left-4 text-white/50"></i>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              />
              <i
                id="confirm-password-toggle"
                className={`absolute top-1/2 -translate-y-1/2 right-4 text-white/50 cursor-pointer hover:text-white transition-colors ${confirmPasswordVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>

            <div className="flex items-center text-xs text-white/70 fade-in-up" style={{ animationDelay: '0.6s' }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 bg-transparent border-white/40 rounded text-green-500 focus:ring-green-500" />
                I agree to the <Link href="#" className="font-bold text-green-400 hover:underline ml-1 transition-colors">Terms & Conditions</Link>
              </label>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                {success}
              </div>
            )}

            <div className="pt-2 fade-in-up" style={{ animationDelay: '0.7s' }}>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            <div className="flex items-center gap-4 text-white/50 text-xs fade-in-up" style={{ animationDelay: '0.8s' }}>
              <hr className="flex-grow border-t border-white/20" />
              <span>or continue with</span>
              <hr className="flex-grow border-t border-white/20" />
            </div>

            <div className="flex gap-4 fade-in-up" style={{ animationDelay: '0.9s' }}>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-lg border border-white/20 hover:bg-white/20 transition duration-300">
                <i className="ri-google-fill"></i> Google
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-lg border border-white/20 hover:bg-white/20 transition duration-300">
                <i className="ri-facebook-fill"></i> Facebook
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-white/70 mt-8 fade-in-up" style={{ animationDelay: '1s' }}>
            Already have an account? <Link href="/login" className="font-bold text-green-400 hover:underline transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;