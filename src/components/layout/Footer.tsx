import Link from 'next/link';
import { Github, Twitter, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Platform: [
            { label: 'Home', href: '/' },
            { label: 'Servers', href: '/servers' },
            { label: 'Leaderboard', href: '/leaderboard' },
            { label: 'Add Server', href: '/servers/add' },
        ],
        Categories: [
            { label: 'Survival', href: '/servers?category=survival' },
            { label: 'Skyblock', href: '/servers?category=skyblock' },
            { label: 'PvP', href: '/servers?category=pvp' },
            { label: 'Creative', href: '/servers?category=creative' },
        ],
        Support: [
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
        ],
    };

    const socialLinks = [
        { icon: <Github size={20} />, href: '#', label: 'GitHub' },
        { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
        { icon: <MessageCircle size={20} />, href: '#', label: 'Discord' },
    ];

    return (
        <footer className="bg-[#0a0a0a] border-t border-[#2d2d4a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-xl">⛏️</span>
                            </div>
                            <span className="font-pixel text-lg text-white">MineHat</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            The best way to discover and share Minecraft servers. Join thousands of players today.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 bg-[#1a1a2e] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:bg-[#252542] transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-pixel text-xs text-white mb-4 uppercase tracking-wider">
                                {title}
                            </h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#4ade80] transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-[#2d2d4a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} MineHat. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500" fill="currentColor" /> for the Minecraft community
                    </p>
                </div>
            </div>
        </footer>
    );
}
