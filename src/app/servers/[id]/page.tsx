'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Copy, Check, ExternalLink, Globe, MessageCircle,
    Users, Star, Calendar, Tag, ChevronLeft, ThumbsUp,
    Send, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelButton from '@/components/ui/PixelButton';
import VoteButton from '@/components/ui/VoteButton';
import { mockServers, reviews } from '@/data/mockData';

export default function ServerDetailPage() {
    const params = useParams();
    const serverId = params.id as string;
    const server = mockServers.find((s) => s.id === serverId);

    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'reviews' | 'comments'>('reviews');
    const [newComment, setNewComment] = useState('');

    if (!server) {
        return (
            <main className="min-h-screen bg-[#0a0a0a]">
                <Navbar />
                <div className="pt-32 text-center">
                    <h1 className="text-white text-2xl mb-4">Server not found</h1>
                    <Link href="/servers">
                        <PixelButton variant="outline">Back to Servers</PixelButton>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const copyIP = () => {
        navigator.clipboard.writeText(server.ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const serverReviews = reviews.filter((r) => r.serverId === serverId);

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Banner */}
            <section className="relative h-64 md:h-80 overflow-hidden">
                {server.imageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${server.imageUrl})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/30 to-[#a855f7]/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                {/* Back button */}
                <div className="absolute top-24 left-4 z-10">
                    <Link href="/servers">
                        <motion.button
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                            <span>Back to Servers</span>
                        </motion.button>
                    </Link>
                </div>

                {/* Badges */}
                <div className="absolute top-24 right-4 z-10 flex gap-2">
                    {server.isPremium && (
                        <span className="premium-badge flex items-center gap-1">
                            <Star size={12} fill="currentColor" />
                            Premium
                        </span>
                    )}
                    {server.isNew && (
                        <span className="bg-[#a855f7] text-white px-3 py-1 rounded text-xs font-bold">
                            NEW
                        </span>
                    )}
                </div>
            </section>

            {/* Server Info */}
            <section className="-mt-20 relative z-10 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2d2d4a] p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <span className="text-[#4ade80] text-sm">{server.category}</span>
                                        <h1 className="text-2xl md:text-3xl font-bold text-white">{server.name}</h1>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-2 rounded-lg">
                                            <Star size={18} className="text-yellow-400" fill="#facc15" />
                                            <span className="text-white font-bold text-lg">{server.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-2 rounded-lg">
                                            <div className="status-online" />
                                            <Users size={18} className="text-gray-400" />
                                            <span className="text-white font-semibold">{server.players.online}</span>
                                            <span className="text-gray-400">/ {server.players.max}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* IP Address */}
                                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-4 mb-6">
                                    <code className="text-[#4ade80] font-mono text-lg flex-1">{server.ip}</code>
                                    <button
                                        onClick={copyIP}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] hover:bg-[#22c55e] text-black rounded-lg transition-colors font-medium"
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={18} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={18} />
                                                Copy IP
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 leading-relaxed mb-6">{server.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {server.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full text-sm text-gray-300"
                                        >
                                            <Tag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Meta info */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar size={16} />
                                        <span>Since {new Date(server.createdAt).getFullYear()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <AlertCircle size={16} />
                                        <span>Version {server.version}</span>
                                    </div>
                                    {server.website && (
                                        <a
                                            href={server.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[#4ade80] hover:underline"
                                        >
                                            <Globe size={16} />
                                            <span>Website</span>
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                    {server.discord && (
                                        <a
                                            href={server.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[#5865F2] hover:underline"
                                        >
                                            <MessageCircle size={16} />
                                            <span>Discord</span>
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>

                            {/* Reviews & Comments */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2d2d4a] overflow-hidden"
                            >
                                {/* Tabs */}
                                <div className="flex border-b border-[#2d2d4a]">
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'reviews'
                                                ? 'text-[#4ade80] border-b-2 border-[#4ade80]'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        Reviews ({serverReviews.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('comments')}
                                        className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'comments'
                                                ? 'text-[#4ade80] border-b-2 border-[#4ade80]'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        Comments
                                    </button>
                                </div>

                                <div className="p-6">
                                    {activeTab === 'reviews' ? (
                                        <div className="space-y-6">
                                            {serverReviews.length > 0 ? (
                                                serverReviews.map((review) => (
                                                    <div key={review.id} className="border-b border-[#2d2d4a] pb-6 last:border-0">
                                                        <div className="flex items-start gap-3 mb-3">
                                                            <div className="w-10 h-10 bg-[#4ade80]/20 rounded-full flex items-center justify-center text-xl">
                                                                {review.avatar}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-white font-medium">{review.username}</span>
                                                                    <div className="flex items-center gap-0.5">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star
                                                                                key={i}
                                                                                size={12}
                                                                                className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                                                                                fill={i < review.rating ? '#facc15' : 'transparent'}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <span className="text-gray-500 text-sm">{review.date}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-300 mb-3">{review.content}</p>
                                                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#4ade80] transition-colors text-sm">
                                                            <ThumbsUp size={14} />
                                                            <span>Helpful ({review.helpful})</span>
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8 text-gray-400">
                                                    No reviews yet. Be the first to review this server!
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Comment input */}
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 bg-[#4ade80]/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                                                    👤
                                                </div>
                                                <div className="flex-1 relative">
                                                    <textarea
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        placeholder="Write a comment..."
                                                        className="w-full bg-black/30 border border-[#2d2d4a] rounded-lg p-3 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] resize-none"
                                                        rows={3}
                                                    />
                                                    <button className="absolute bottom-3 right-3 text-[#4ade80] hover:text-[#22c55e] transition-colors">
                                                        <Send size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-center text-gray-500 py-4">
                                                No comments yet. Start the conversation!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Vote Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2d2d4a] p-6"
                            >
                                <h3 className="font-pixel text-sm text-white text-center mb-6">Support This Server</h3>
                                <VoteButton serverId={server.id} votes={server.votes} />
                            </motion.div>

                            {/* Server Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2d2d4a] p-6"
                            >
                                <h3 className="font-pixel text-sm text-white mb-6">Server Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Total Votes</span>
                                        <span className="text-white font-semibold">{server.votes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Avg. Players</span>
                                        <span className="text-white font-semibold">{Math.round(server.players.online * 0.8)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Peak Players</span>
                                        <span className="text-white font-semibold">{server.players.max}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Uptime</span>
                                        <span className="text-[#4ade80] font-semibold">99.9%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Reviews</span>
                                        <span className="text-white font-semibold">{serverReviews.length}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Similar Servers */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2d2d4a] p-6"
                            >
                                <h3 className="font-pixel text-sm text-white mb-6">Similar Servers</h3>
                                <div className="space-y-3">
                                    {mockServers
                                        .filter((s) => s.category === server.category && s.id !== server.id)
                                        .slice(0, 3)
                                        .map((s) => (
                                            <Link
                                                key={s.id}
                                                href={`/servers/${s.id}`}
                                                className="block bg-black/30 rounded-lg p-3 hover:bg-black/50 transition-colors"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-white font-medium text-sm truncate">{s.name}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star size={12} className="text-yellow-400" fill="#facc15" />
                                                        <span className="text-white text-sm">{s.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <Users size={12} />
                                                    <span>{s.players.online} online</span>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
