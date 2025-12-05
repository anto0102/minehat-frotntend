'use client';

import { motion } from 'framer-motion';

interface PixelLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export default function PixelLoader({ size = 'md', text = 'Loading...' }: PixelLoaderProps) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const blockSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const blocks = [
        { delay: 0, x: 0, y: 0 },
        { delay: 0.1, x: 1, y: 0 },
        { delay: 0.2, x: 0, y: 1 },
        { delay: 0.3, x: 1, y: 1 },
    ];

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizes[size]} relative grid grid-cols-2 gap-0.5`}>
                {blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        className={`${blockSizes[size]} bg-[#4ade80] rounded-sm`}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1,
                            delay: block.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
            {text && (
                <motion.p
                    className="font-pixel text-xs text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
}

// Alternative spinning pickaxe loader
export function PickaxeLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-6xl'
    };

    return (
        <motion.div
            className={`${sizes[size]}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
            ⛏️
        </motion.div>
    );
}

// Block stacking loader
export function BlockStackLoader() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-br from-[#8b5a2b] to-[#5f3a1a] rounded-sm"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
            <p className="font-pixel text-xs text-gray-400">Mining...</p>
        </div>
    );
}
