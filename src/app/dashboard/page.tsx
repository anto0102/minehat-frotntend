'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Server, Settings, LogOut, Plus, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelButton from '@/components/ui/PixelButton';
import MinecraftLinkingSection from '@/components/MinecraftLinkingSection';
import { mockServers } from '@/data/mockData';

export default function DashboardPage() {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data for user's servers (in a real app, fetch from DB)
    const myServers = mockServers.slice(0, 2);

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: <User size={20} /> },
        { id: 'servers', label: 'My Servers', icon: <Server size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-6 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#4ade80]/10 rounded-full flex items-center justify-center border border-[#4ade80]/20 text-[#4ade80]">
                                    <User size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-white font-bold truncate">{user.email?.split('@')[0]}</h3>
                                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id
                                            ? 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20'
                                            : 'text-gray-400 hover:bg-[#2d2d4a]/50 hover:text-white'
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8 border-t border-[#2d2d4a]">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-[#2d2d4a] rounded-2xl p-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ade80]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="font-pixel text-2xl md:text-3xl text-white mb-2">Dashboard</h1>
                                    <p className="text-gray-400">Welcome back to your command center.</p>
                                </div>
                                <Link href="/servers/add">
                                    <PixelButton icon={<Plus size={18} />}>Add Server</PixelButton>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Content based on active tab */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Stats Grid */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-[#4ade80]/10 rounded-lg text-[#4ade80]">
                                                    <Server size={24} />
                                                </div>
                                                <span className="text-gray-400">Total Servers</span>
                                            </div>
                                            <p className="text-3xl font-bold text-white">{myServers.length}</p>
                                        </div>
                                        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-[#fbbf24]/10 rounded-lg text-[#fbbf24]">
                                                    <BarChart3 size={24} />
                                                </div>
                                                <span className="text-gray-400">Total Votes</span>
                                            </div>
                                            <p className="text-3xl font-bold text-white">1,234</p>
                                        </div>
                                        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-[#06b6d4]/10 rounded-lg text-[#06b6d4]">
                                                    <Shield size={24} />
                                                </div>
                                                <span className="text-gray-400">Account Status</span>
                                            </div>
                                            <p className="text-xl font-bold text-[#4ade80]">Verified</p>
                                        </div>
                                    </div>

                                    {/* Recent Servers */}
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-4">Your Servers</h2>
                                        <div className="grid gap-4">
                                            {myServers.map((server) => (
                                                <div key={server.id} className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-4 flex items-center justify-between hover:border-[#4ade80]/50 transition-colors group">
                                                    <div className="flex items-center gap-4">
                                                        <img src={server.imageUrl} alt={server.name} className="w-12 h-12 rounded-lg bg-gray-800 object-cover" />
                                                        <div>
                                                            <h3 className="text-white font-bold group-hover:text-[#4ade80] transition-colors">{server.name}</h3>
                                                            <p className="text-gray-500 text-sm">{server.ip}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${server.status === 'offline' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                            {server.status || 'online'}
                                                        </div>
                                                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                                            <Settings size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'servers' && (
                                <div className="text-center py-20 bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl border-dashed">
                                    <Server size={48} className="mx-auto text-gray-600 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Manage Your Servers</h3>
                                    <p className="text-gray-400 mb-6">Detailed server management coming soon.</p>
                                    <Link href="/servers/add">
                                        <PixelButton>Add New Server</PixelButton>
                                    </Link>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="max-w-2xl mx-auto space-y-8">
                                    <MinecraftLinkingSection />
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="text-center py-20 bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl border-dashed">
                                    <BarChart3 size={48} className="mx-auto text-gray-600 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                                    <p className="text-gray-400">This section is under construction.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
