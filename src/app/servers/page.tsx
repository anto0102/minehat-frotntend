'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Crown, Sparkles, Clock, X, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServerCard from '@/components/ui/ServerCard';
import PixelButton from '@/components/ui/PixelButton';
import { mockServers, categories } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

type SortOption = 'votes' | 'players' | 'rating' | 'newest';
type FilterType = 'all' | 'premium' | 'new';

export default function ServersPage() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('votes');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

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

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-12 px-4 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-[#4ade80]/5 via-transparent to-transparent blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                            {t.leaderboard.title}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t.leaderboard.subtitle.replace('{count}', mockServers.length.toString())}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="sticky top-16 z-40 py-4 px-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2d2d4a]">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                            {/* Custom Sort Dropdown */}
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

                            {/* Filter toggle */}
                            <PixelButton
                                variant={showFilters ? 'primary' : 'outline'}
                                onClick={() => setShowFilters(!showFilters)}
                                icon={<Filter size={16} />}
                            >
                                <span className="hidden sm:inline">{t.leaderboard.filters.label}</span>
                            </PixelButton>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="py-4 space-y-4 border-t border-[#2d2d4a]">
                                    {/* Type filters */}
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setFilterType(option.value)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${filterType === option.value
                                                    ? 'bg-[#4ade80] text-black font-bold shadow-[0_0_10px_rgba(74,222,128,0.3)]'
                                                    : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2d2d4a] hover:border-[#4ade80]/50'
                                                    }`}
                                            >
                                                {option.icon}
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mt-4 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'All'
                                ? 'bg-[#4ade80] text-black font-bold font-pixel text-xs'
                                : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2d2d4a] hover:border-[#4ade80]/50 font-pixel text-xs'
                                }`}
                        >
                            ALL
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === category
                                    ? 'bg-[#4ade80] text-black font-bold font-pixel text-xs'
                                    : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2d2d4a] hover:border-[#4ade80]/50 font-pixel text-xs'
                                    }`}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-400 text-sm">
                            {t.leaderboard.results.found} <span className="text-white font-semibold">{filteredServers.length}</span> servers
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-[#4ade80] text-sm hover:underline flex items-center gap-1"
                            >
                                <X size={14} />
                                {t.leaderboard.results.clear}
                            </button>
                        )}
                    </div>

                    {/* Server grid */}
                    {filteredServers.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServers.map((server, index) => (
                                <motion.div
                                    key={server.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ServerCard {...server} rank={sortBy === 'votes' ? index + 1 : undefined} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
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
