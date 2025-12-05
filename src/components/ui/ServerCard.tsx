'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Star, ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface ServerCardProps {
    id: string;
    name: string;
    description: string;
    ip: string;
    players: { online: number; max: number };
    votes: number;
    rating: number;
    category: string;
    imageUrl?: string;
    isPremium?: boolean;
    isNew?: boolean;
    rank?: number;
}

export default function ServerCard({
    id,
    name,
    description,
    ip,
    players,
    votes,
    rating,
    category,
    imageUrl,
    isPremium = false,
    isNew = false,
    rank
}: ServerCardProps) {
    const { t } = useLanguage();

    return (
        <Link href={`/servers/${id}`}>
            <motion.div
                className="server-card rounded-xl overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                {/* Banner Image */}
                <div className="relative h-32 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] overflow-hidden">
                    {imageUrl ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/20 to-[#06b6d4]/20" />
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {rank && rank <= 3 && (
                            <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${rank === 1 ? 'bg-yellow-500 text-black' :
                                rank === 2 ? 'bg-gray-300 text-black' :
                                    'bg-amber-700 text-white'
                                }`}>
                                <Award size={12} />
                                #{rank}
                            </span>
                        )}
                        {isPremium && (
                            <span className="premium-badge flex items-center gap-1">
                                <Star size={10} fill="currentColor" />
                                {t.serverCard.premium}
                            </span>
                        )}
                        {isNew && (
                            <span className="bg-[#a855f7] text-white px-2 py-1 rounded text-xs font-bold uppercase">
                                {t.serverCard.new}
                            </span>
                        )}
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-3 right-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#4ade80] transition-colors truncate">
                            {name}
                        </h3>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-[#4ade80] transition-colors flex-shrink-0 ml-2" />
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {description}
                    </p>

                    {/* Server IP */}
                    <div className="bg-black/40 rounded-lg px-3 py-2 mb-3 font-mono text-sm text-[#4ade80]">
                        {ip}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="status-online" />
                                <Users size={14} className="text-gray-400" />
                                <span className="text-gray-300">
                                    <span className="text-white font-semibold">{players.online}</span>/{players.max}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Heart size={14} className="text-red-400" />
                                <span className="text-white font-semibold">{votes}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400" fill="#facc15" />
                            <span className="text-white font-semibold">{rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
