'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Copy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PixelButton from '@/components/ui/PixelButton';
import { getLinkedMinecraftAccount, unlinkMinecraftAccount } from '@/lib/firebase-db';

interface LinkCode {
    code: string;
    expiresAt: number;
}

interface LinkedAccount {
    linked: boolean;
    minecraftUuid?: string;
    minecraftUsername?: string;
    linkedAt?: number;
}

export default function MinecraftLinkingSection() {
    const { user } = useAuth();
    const [linkCode, setLinkCode] = useState<LinkCode | null>(null);
    const [linkedAccount, setLinkedAccount] = useState<LinkedAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Load linked account status
    useEffect(() => {
        if (user) {
            loadLinkedAccount();
        }
    }, [user]);

    // Update countdown timer
    useEffect(() => {
        if (!linkCode) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, linkCode.expiresAt - Date.now());
            setTimeLeft(remaining);

            if (remaining === 0) {
                setLinkCode(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [linkCode]);

    const loadLinkedAccount = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const account = await getLinkedMinecraftAccount(user.uid);
            setLinkedAccount(account);
        } catch (error) {
            console.error('Error loading linked account:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateCode = async () => {
        if (!user) return;

        try {
            setGenerating(true);
            const response = await fetch('/api/minecraft/generate-code', {
                headers: {
                    'x-user-id': user.uid,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate code');
            }

            const data = await response.json();
            setLinkCode({
                code: data.code,
                expiresAt: data.expiresAt,
            });
            setTimeLeft(data.expiresAt - Date.now());
        } catch (error) {
            console.error('Error generating code:', error);
            alert('Errore durante la generazione del codice');
        } finally {
            setGenerating(false);
        }
    };

    const copyCode = () => {
        if (linkCode) {
            navigator.clipboard.writeText(linkCode.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleUnlink = async () => {
        if (!user || !confirm('Sei sicuro di voler scollegare il tuo account Minecraft?')) {
            return;
        }

        try {
            const success = await unlinkMinecraftAccount(user.uid);
            if (success) {
                setLinkedAccount({ linked: false });
                alert('Account scollegato con successo');
            } else {
                alert('Errore durante lo scollegamento');
            }
        } catch (error) {
            console.error('Error unlinking account:', error);
            alert('Errore durante lo scollegamento');
        }
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-8">
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-[#4ade80] border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-400 mt-4">Caricamento...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-8">
            <h2 className="text-2xl font-pixel text-white mb-6">Collegamento Minecraft</h2>

            {linkedAccount?.linked ? (
                // Already linked
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="text-[#4ade80]" size={24} />
                            <h3 className="text-lg font-bold text-white">Account Collegato</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-300">
                                <span className="text-gray-500">Username:</span>{' '}
                                <span className="font-bold">{linkedAccount.minecraftUsername}</span>
                            </p>
                            <p className="text-gray-300 text-sm">
                                <span className="text-gray-500">UUID:</span>{' '}
                                <span className="font-mono text-xs">{linkedAccount.minecraftUuid}</span>
                            </p>
                            {linkedAccount.linkedAt && (
                                <p className="text-gray-500 text-sm">
                                    Collegato il {new Date(linkedAccount.linkedAt).toLocaleDateString('it-IT')}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleUnlink}
                        className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors font-medium"
                    >
                        Scollega Account
                    </button>
                </motion.div>
            ) : (
                // Not linked
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-[#0a0a0a] rounded-xl border border-[#2d2d4a] p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="text-gray-500" size={24} />
                            <h3 className="text-lg font-bold text-white">Collega il tuo Account Minecraft</h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Per votare e ricevere ricompense, devi collegare il tuo account Minecraft. Entra nel server
                            e inserisci il codice qui sotto usando il comando <code className="px-2 py-1 bg-[#1a1a2e] rounded text-[#4ade80]">/code</code>.
                        </p>

                        {linkCode ? (
                            <div className="space-y-4">
                                <div className="bg-[#1a1a2e] border border-[#4ade80]/20 rounded-xl p-6 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Il tuo codice:</p>
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <span className="text-4xl font-pixel text-[#4ade80] tracking-wider">
                                            {linkCode.code}
                                        </span>
                                        <button
                                            onClick={copyCode}
                                            className="p-2 hover:bg-[#4ade80]/10 rounded-lg transition-colors"
                                            title="Copia codice"
                                        >
                                            {copied ? (
                                                <CheckCircle className="text-[#4ade80]" size={20} />
                                            ) : (
                                                <Copy className="text-gray-400" size={20} />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        Scade tra: <span className="text-[#fbbf24] font-bold">{formatTime(timeLeft)}</span>
                                    </p>
                                </div>

                                <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-4">
                                    <h4 className="text-white font-bold mb-2">Come collegare:</h4>
                                    <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                                        <li>Entra nel server Minecraft</li>
                                        <li>Digita <code className="px-1 bg-[#0a0a0a] rounded text-[#4ade80]">/code {linkCode.code}</code></li>
                                        <li>Il tuo account verrà collegato automaticamente!</li>
                                    </ol>
                                </div>

                                <button
                                    onClick={generateCode}
                                    disabled={generating}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2d2d4a] border border-[#4a4a6a] rounded-xl text-gray-300 hover:bg-[#3d3d5a] transition-colors font-medium disabled:opacity-50"
                                >
                                    <RefreshCw size={18} className={generating ? 'animate-spin' : ''} />
                                    Genera Nuovo Codice
                                </button>
                            </div>
                        ) : (
                            <PixelButton onClick={generateCode} disabled={generating}>
                                {generating ? 'Generazione...' : 'Genera Codice'}
                            </PixelButton>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
