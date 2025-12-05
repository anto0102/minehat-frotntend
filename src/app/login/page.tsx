'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelButton from '@/components/ui/PixelButton';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Only for register
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                // Here you would typically also save the username to the user profile or database
            }
            router.push('/dashboard'); // Redirect to dashboard after success
        } catch (err: any) {
            console.error(err);
            // Simple error mapping
            if (err.code === 'auth/invalid-email') setError('Invalid email address.');
            else if (err.code === 'auth/user-disabled') setError('User account disabled.');
            else if (err.code === 'auth/user-not-found') setError('User not found.');
            else if (err.code === 'auth/wrong-password') setError('Invalid password.');
            else if (err.code === 'auth/email-already-in-use') setError('Email already in use.');
            else if (err.code === 'auth/weak-password') setError('Password is too weak.');
            else setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center relative px-4 py-20">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4ade80]/5 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[128px]" />
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-[#2d2d4a] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Top Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent opacity-50" />

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="font-pixel text-2xl text-white mb-2">
                                {isLogin ? 'Welcome Back!' : 'Join MineHat'}
                            </h1>
                            <p className="text-gray-400 text-sm">
                                {isLogin
                                    ? 'Sign in to manage your servers and vote.'
                                    : 'Create an account to start your journey.'}
                            </p>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-400 text-sm"
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 uppercase font-bold ml-1">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="MinecraftUsername"
                                            className="w-full bg-[#0a0a0a] border border-[#2d2d4a] rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4ade80] transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-bold ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="steve@minecraft.com"
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d4a] rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-bold ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d4a] rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4ade80] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <PixelButton
                                    type="submit"
                                    className="w-full justify-center"
                                    isLoading={loading}
                                    icon={!loading && <ArrowRight size={18} />}
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </PixelButton>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#2d2d4a]"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#1a1a2e] px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 bg-[#0a0a0a] border border-[#2d2d4a] rounded-xl py-2.5 text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
                                <Github size={18} />
                                <span className="text-sm font-medium">Github</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#0a0a0a] border border-[#2d2d4a] rounded-xl py-2.5 text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
                                <Chrome size={18} />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                        </div>

                        {/* Toggle Mode */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[#4ade80] hover:underline font-medium"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
