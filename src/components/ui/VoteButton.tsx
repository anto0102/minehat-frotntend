'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';

interface VoteButtonProps {
    serverId: string;
    votes: number;
    onVote?: () => void;
}

export default function VoteButton({ serverId, votes, onVote }: VoteButtonProps) {
    const [hasVoted, setHasVoted] = useState(false);
    const [cooldownTime, setCooldownTime] = useState<number | null>(null);
    const [isVoting, setIsVoting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if user has voted today (using localStorage for demo)
    useEffect(() => {
        const lastVote = localStorage.getItem(`vote_${serverId}`);
        if (lastVote) {
            const lastVoteTime = parseInt(lastVote);
            const now = Date.now();
            const timeSinceVote = now - lastVoteTime;
            const cooldownDuration = 24 * 60 * 60 * 1000; // 24 hours

            if (timeSinceVote < cooldownDuration) {
                setHasVoted(true);
                setCooldownTime(cooldownDuration - timeSinceVote);
            }
        }
    }, [serverId]);

    // Countdown timer
    useEffect(() => {
        if (cooldownTime && cooldownTime > 0) {
            const interval = setInterval(() => {
                setCooldownTime((prev) => {
                    if (prev && prev <= 1000) {
                        setHasVoted(false);
                        return null;
                    }
                    return prev ? prev - 1000 : null;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cooldownTime]);

    const handleVote = async () => {
        if (hasVoted || isVoting) return;

        setIsVoting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save vote time
        localStorage.setItem(`vote_${serverId}`, Date.now().toString());
        setHasVoted(true);
        setCooldownTime(24 * 60 * 60 * 1000);
        setShowSuccess(true);
        setIsVoting(false);

        setTimeout(() => setShowSuccess(false), 3000);

        if (onVote) onVote();
    };

    const formatCooldown = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4">
            {/* Vote count display */}
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                <Heart size={28} className="text-red-500" fill="#ef4444" />
                <motion.span
                    key={votes}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="gradient-text"
                >
                    {votes.toLocaleString()}
                </motion.span>
                <span className="text-gray-400 text-lg font-normal">votes</span>
            </div>

            {/* Vote button */}
            <div className="relative">
                {hasVoted ? (
                    <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-[#4ade80] mb-2">
                            <CheckCircle size={20} />
                            <span className="font-semibold">Already Voted!</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <Clock size={16} />
                            <span className="font-mono text-lg">{cooldownTime ? formatCooldown(cooldownTime) : '00:00:00'}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">until next vote</p>
                    </div>
                ) : (
                    <PixelButton
                        size="lg"
                        className="w-full"
                        onClick={handleVote}
                        disabled={isVoting}
                        icon={isVoting ? undefined : <Heart size={18} />}
                    >
                        {isVoting ? 'Voting...' : 'Vote Now'}
                    </PixelButton>
                )}
            </div>

            {/* Success notification */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#4ade80]/20 border border-[#4ade80]/30 rounded-lg p-3 flex items-center gap-2 text-[#4ade80]"
                >
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Vote registered successfully!</span>
                </motion.div>
            )}

            {/* Info text */}
            <div className="flex items-start gap-2 text-gray-500 text-xs">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p>You can vote once every 24 hours. Your vote helps this server climb the rankings!</p>
            </div>
        </div>
    );
}
