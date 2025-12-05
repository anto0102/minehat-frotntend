'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Plus, Trophy, Gamepad2, LogIn, Globe, User } from 'lucide-react';
import Link from 'next/link';
import PixelButton from '@/components/ui/PixelButton';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const { user } = useAuth();

    const navLinks = [
        { href: '/', label: t.nav.home, icon: <Gamepad2 size={16} /> },
        { href: '/servers', label: t.nav.servers, icon: <Search size={16} /> },
        { href: '/leaderboard', label: t.nav.leaderboard, icon: <Trophy size={16} /> },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'it' ? 'en' : 'it');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2d2d4a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="w-10 h-10 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 10, scale: 1.05 }}
                        >
                            <span className="text-xl">⛏️</span>
                        </motion.div>
                        <span className="font-pixel text-lg text-white group-hover:text-[#4ade80] transition-colors">
                            MineHat
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 text-gray-400 hover:text-[#4ade80] transition-colors text-sm font-medium"
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Globe size={18} />
                            <span className="text-sm font-medium uppercase">{language}</span>
                        </button>
                        <Link href="/servers/add">
                            <PixelButton size="sm" icon={<Plus size={14} />}>
                                {t.nav.addServer}
                            </PixelButton>
                        </Link>
                        {user ? (
                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                    <div className="w-6 h-6 bg-[#4ade80]/20 rounded-full flex items-center justify-center text-[#4ade80]">
                                        <User size={14} />
                                    </div>
                                    <span className="text-sm font-medium">Dashboard</span>
                                </button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                    <LogIn size={18} />
                                    <span className="text-sm font-medium">{t.nav.login}</span>
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-400 hover:text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#111111] border-b border-[#2d2d4a] overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 text-gray-300 hover:text-[#4ade80] transition-colors py-2"
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="border-[#2d2d4a]" />
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-3 text-gray-300 hover:text-[#4ade80] transition-colors py-2 w-full"
                            >
                                <Globe size={16} />
                                <span className="uppercase">{language === 'it' ? 'English' : 'Italiano'}</span>
                            </button>
                            <Link href="/servers/add" onClick={() => setIsOpen(false)}>
                                <PixelButton size="sm" className="w-full" icon={<Plus size={14} />}>
                                    {t.nav.addServer}
                                </PixelButton>
                            </Link>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full py-2">
                                <LogIn size={18} />
                                <span className="text-sm font-medium">{t.nav.login}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
