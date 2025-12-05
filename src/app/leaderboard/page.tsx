'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Crown, Sparkles, Clock, X, Check, Trophy, Users, Star, Copy } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelButton from '@/components/ui/PixelButton';
import { mockServers, categories } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

type SortOption = 'votes' | 'players' | 'rating' | 'newest';
type FilterType = 'all' | 'premium' | 'new';

export default function LeaderboardPage() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('votes');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [copiedIp, setCopiedIp] = useState<string | null>(null);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'votes', label: t.leaderboard.sort.votes },
        { value: 'players', label: t.leaderboard.sort.players },
        { value: 'rating', label: t.leaderboard.sort.rating },
        { value: 'newest', label: t.leaderboard.sort.newest },
    ];

    const filterOptions: { value: FilterType; label: string; icon: React.ReactNode }[] = [
        { value: 'all', label: t.leaderboard.filters.all, icon: null },
        { value: 'premium', label: t.leaderboard.filters.premium, icon: <Crown size={14} className="text-yellow-400" /> },
        { value: 'new', label: t.leaderboard.filters.new, icon: <Sparkles size={14} className="text-purple-400" /> },
    ];

    const filteredServers = useMemo(() => {
        let filtered = [...mockServers];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (server) =>
                    server.name.toLowerCase().includes(query) ||
                    server.ip.toLowerCase().includes(query) ||
                    server.description.toLowerCase().includes(query) ||
                    server.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((server) => server.category === selectedCategory);
        }

        // Type filter
        if (filterType === 'premium') {
            filtered = filtered.filter((server) => server.isPremium);
        } else if (filterType === 'new') {
            filtered = filtered.filter((server) => server.isNew);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'votes':
                    return b.votes - a.votes;
                case 'players':
                    return b.players.online - a.players.online;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategory, sortBy, filterType]);

    const top3 = filteredServers.slice(0, 3);
    const rest = filteredServers.slice(3);

    const handleCopyIp = (e: React.MouseEvent, ip: string) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(ip);
        setCopiedIp(ip);
        setTimeout(() => setCopiedIp(null), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-12 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-[#4ade80]/5 via-transparent to-transparent blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                            {t.leaderboard.leaderboardTitle}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t.leaderboard.subtitle.replace('{count}', mockServers.length.toString())}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Podium Section (Only show if no search/filters active or if results include top servers) */}
            {!searchQuery && selectedCategory === 'All' && filterType === 'all' && sortBy === 'votes' && top3.length > 0 && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-4 min-h-[400px]">
                            {/* 2nd Place */}
                            {top3[1] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="order-2 md:order-1 w-full md:w-1/3 max-w-[320px] relative"
                                >
                                    <div className="bg-[#1a1a2e] border-2 border-gray-400 rounded-t-2xl p-6 flex flex-col items-center relative overflow-hidden group hover:border-gray-300 transition-colors">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.5)]" />
                                        <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4 shadow-lg z-10">
                                            2
                                        </div>
                                        <div className="w-20 h-20 rounded-xl bg-gray-800 mb-4 overflow-hidden border border-gray-700">
                                            <img src={top3[1].icon} alt={top3[1].name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1 truncate w-full text-center">{top3[1].name}</h3>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                                            <Users size={14} />
                                            <span>{top3[1].players.online.toLocaleString()}</span>
                                        </div>
                                        <Link href={`/servers/${top3[1].id}`} className="w-full">
                                            <PixelButton size="sm" variant="outline" className="w-full">
                                                {t.serverCard.vote}
                                            </PixelButton>
                                        </Link>
                                    </div>
                                    <div className="h-24 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-50" />
                                </motion.div>
                            )}

                            {/* 1st Place */}
                            {top3[0] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="order-1 md:order-2 w-full md:w-1/3 max-w-[360px] relative z-10 -mt-12 md:-mt-0"
                                >
                                    <div className="bg-[#1a1a2e] border-2 border-yellow-400 rounded-t-2xl p-8 flex flex-col items-center relative overflow-hidden group hover:border-yellow-300 transition-colors shadow-[0_0_30px_rgba(250,204,21,0.15)]">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                            <Crown size={48} className="text-yellow-400 fill-yellow-400/20 animate-bounce" />
                                        </div>
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-2xl mb-4 shadow-lg z-10 mt-6">
                                            1
                                        </div>
                                        <div className="w-24 h-24 rounded-xl bg-gray-800 mb-4 overflow-hidden border-2 border-yellow-400/50">
                                            <img src={top3[0].icon} alt={top3[0].name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-white font-bold text-xl mb-1 truncate w-full text-center">{top3[0].name}</h3>
                                        <div className="flex items-center gap-2 text-yellow-400 text-sm mb-6 font-medium">
                                            <Star size={16} className="fill-yellow-400" />
                                            <span>{top3[0].votes.toLocaleString()} {t.serverCard.vote}</span>
                                        </div>
                                        <Link href={`/servers/${top3[0].id}`} className="w-full">
                                            <PixelButton size="md" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black border-yellow-600">
                                                {t.serverCard.vote}
                                            </PixelButton>
                                        </Link>
                                    </div>
                                    <div className="h-32 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-50" />
                                </motion.div>
                            )}

                            {/* 3rd Place */}
                            {top3[2] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="order-3 w-full md:w-1/3 max-w-[320px] relative"
                                >
                                    <div className="bg-[#1a1a2e] border-2 border-orange-400 rounded-t-2xl p-6 flex flex-col items-center relative overflow-hidden group hover:border-orange-300 transition-colors">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]" />
                                        <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4 shadow-lg z-10">
                                            3
                                        </div>
                                        <div className="w-20 h-20 rounded-xl bg-gray-800 mb-4 overflow-hidden border border-gray-700">
                                            <img src={top3[2].icon} alt={top3[2].name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1 truncate w-full text-center">{top3[2].name}</h3>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                                            <Users size={14} />
                                            <span>{top3[2].players.online.toLocaleString()}</span>
                                        </div>
                                        <Link href={`/servers/${top3[2].id}`} className="w-full">
                                            <PixelButton size="sm" variant="outline" className="w-full">
                                                {t.serverCard.vote}
                                            </PixelButton>
                                        </Link>
                                    </div>
                                    <div className="h-20 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-50" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Filters & List Section */}
            <section className="py-8 px-4 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-30 bg-[#0a0a0a]/95 backdrop-blur-md py-4 border-b border-[#2d2d4a]">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder={t.leaderboard.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl py-3 px-11 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl py-3 px-4 text-white hover:border-[#4ade80] transition-colors min-w-[160px] justify-between"
                                >
                                    <span className="text-sm truncate">
                                        {sortOptions.find(o => o.value === sortBy)?.label}
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isSortOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-2 w-full bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl shadow-xl z-20 overflow-hidden"
                                            >
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setSortBy(option.value);
                                                            setIsSortOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#252542] transition-colors flex items-center justify-between ${sortBy === option.value ? 'text-[#4ade80]' : 'text-gray-300'
                                                            }`}
                                                    >
                                                        {option.label}
                                                        {sortBy === option.value && <Check size={14} />}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            <PixelButton
                                variant={showFilters ? 'primary' : 'outline'}
                                onClick={() => setShowFilters(!showFilters)}
                                icon={<Filter size={16} />}
                            >
                                <span className="hidden sm:inline">{t.leaderboard.filters.label}</span>
                            </PixelButton>
                        </div>
                    </div>

                    {/* Server List */}
                    <div className="space-y-4">
                        {/* List Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-6">Server</div>
                            <div className="col-span-2 text-center">{t.serverCard.players}</div>
                            <div className="col-span-2 text-center">{t.serverCard.vote}</div>
                            <div className="col-span-1"></div>
                        </div>

                        {/* Rows */}
                        {filteredServers.map((server, index) => {
                            // If showing podium, skip top 3 in the list (unless filtering/searching)
                            const showPodium = !searchQuery && selectedCategory === 'All' && filterType === 'all' && sortBy === 'votes';
                            if (showPodium && index < 3) return null;

                            const rank = index + 1;

                            return (
                                <motion.div
                                    key={server.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl hover:border-[#4ade80]/50 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.05)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

                                    <div className="p-4 md:p-0 md:grid md:grid-cols-12 gap-4 items-center">
                                        {/* Rank */}
                                        <div className="flex items-center justify-between md:justify-center md:col-span-1 mb-4 md:mb-0">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${rank <= 3 ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-[#2d2d4a] text-gray-400'
                                                }`}>
                                                {rank}
                                            </div>
                                            {/* Mobile only: Status indicator */}
                                            <div className="md:hidden flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <span className="text-xs text-gray-500 uppercase">{server.status}</span>
                                            </div>
                                        </div>

                                        {/* Server Info */}
                                        <div className="md:col-span-6 flex items-center gap-4 mb-4 md:mb-0">
                                            <img src={server.icon} alt={server.name} className="w-12 h-12 rounded-lg object-cover bg-gray-800" />
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Link href={`/servers/${server.id}`} className="font-bold text-white hover:text-[#4ade80] transition-colors truncate">
                                                        {server.name}
                                                    </Link>
                                                    {server.isPremium && <Crown size={14} className="text-yellow-400 fill-yellow-400/20 flex-shrink-0" />}
                                                    {server.isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#4ade80] text-black uppercase">NEW</span>}
                                                </div>
                                                <div
                                                    className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors group/ip"
                                                    onClick={(e) => handleCopyIp(e, server.ip)}
                                                >
                                                    <span className="font-mono bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#2d2d4a] group-hover/ip:border-[#4ade80]/50 transition-colors">
                                                        {copiedIp === server.ip ? t.serverCard.copied : server.ip}
                                                    </span>
                                                    <Copy size={12} className="opacity-0 group-hover/ip:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Players */}
                                        <div className="flex items-center justify-between md:justify-center md:col-span-2 mb-2 md:mb-0">
                                            <span className="md:hidden text-gray-500 text-sm">{t.serverCard.players}</span>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Users size={16} className="text-[#4ade80]" />
                                                <span>{server.players.online}/{server.players.max}</span>
                                            </div>
                                        </div>

                                        {/* Votes */}
                                        <div className="flex items-center justify-between md:justify-center md:col-span-2 mb-4 md:mb-0">
                                            <span className="md:hidden text-gray-500 text-sm">{t.serverCard.vote}</span>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Star size={16} className="text-yellow-400" />
                                                <span>{server.votes}</span>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="md:col-span-1 flex justify-end">
                                            <Link href={`/servers/${server.id}`} className="w-full md:w-auto">
                                                <PixelButton size="sm" className="w-full md:w-auto">
                                                    {t.serverCard.vote}
                                                </PixelButton>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredServers.length === 0 && (
                        <div className="text-center py-20 bg-[#1a1a2e]/50 rounded-2xl border border-[#2d2d4a] border-dashed">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-white text-xl font-semibold mb-2">{t.leaderboard.results.noResults}</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                {t.leaderboard.results.tryAdjusting}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
