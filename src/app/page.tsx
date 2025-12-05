'use client';

import { motion } from 'framer-motion';
import { Search, ChevronRight, Users, Trophy, Star, Rocket, Zap, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelButton from '@/components/ui/PixelButton';
import ServerCard from '@/components/ui/ServerCard';
import { mockServers } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const topServers = mockServers.slice(0, 6);
  const featuredStats = [
    { icon: <Users size={24} />, value: '50,000+', label: t.home.stats.players },
    { icon: <Trophy size={24} />, value: '2,500+', label: t.home.stats.servers },
    { icon: <Star size={24} />, value: '100,000+', label: t.home.stats.votes },
  ];



  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#4ade80]/10 via-transparent to-transparent blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
                {t.home.hero.title1}<br />
                {t.home.hero.title2}<br />
                <span className="gradient-text">{t.home.hero.title3}</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                {t.home.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/servers">
                  <PixelButton size="lg" icon={<ChevronRight size={18} />}>
                    {t.home.hero.getStarted}
                  </PixelButton>
                </Link>
                <Link href="/servers/add">
                  <PixelButton variant="outline" size="lg">
                    {t.home.hero.addServer}
                  </PixelButton>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {featuredStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-[#4ade80] mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right content - Minecraft Characters Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px]">
                {/* Main Minecraft Heroes Image */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src="/minecraft-heroes.png"
                    alt="Minecraft Characters"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#4ade80] rounded-full opacity-60"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${20 + (i % 4) * 15}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Floating stars */}
                <motion.div
                  className="absolute top-16 right-8 text-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute top-48 right-4 text-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  ⭐
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-500 z-10" size={20} />
            <input
              type="text"
              placeholder={t.leaderboard.searchPlaceholder}
              className="w-full bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
            <div className="absolute right-2">
              <PixelButton size="sm">
                Search
              </PixelButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4ade80]/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fbbf24]/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-[#4ade80] font-pixel text-sm uppercase tracking-wider">Features</span>
            <h2 className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white mt-4">
              {t.home.features.title}
            </h2>
          </motion.div>

          <div className="space-y-32">
            {/* Feature 1: Boost (Text Left, Image Right) */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#4ade80]/20">
                  <Rocket className="text-[#4ade80]" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.features.boost.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {t.home.features.boost.desc}
                </p>
                <ul className="space-y-3">
                  {['Instant Visibility', 'Community Voting', 'Ranked Rewards'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#4ade80] blur-[100px] opacity-20" />
                <img
                  src="/feature-boost.png"
                  alt="Boost Feature"
                  className="relative z-10 w-full drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Feature 2: Stats (Image Left, Text Right) */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="absolute inset-0 bg-[#fbbf24] blur-[100px] opacity-20" />
                <img
                  src="/feature-stats.png"
                  alt="Stats Feature"
                  className="relative z-10 w-full drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="w-16 h-16 bg-[#fbbf24]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#fbbf24]/20">
                  <Zap className="text-[#fbbf24]" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.features.stats.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {t.home.features.stats.desc}
                </p>
                <ul className="space-y-3">
                  {['Live Player Count', 'Uptime Monitoring', 'Historical Data'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Feature 3: Verified (Text Left, Image Right) */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#06b6d4]/20">
                  <Shield className="text-[#06b6d4]" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t.home.features.verified.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {t.home.features.verified.desc}
                </p>
                <ul className="space-y-3">
                  {['DDOS Protection', 'Verified Badge', 'Premium Support'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#06b6d4] blur-[100px] opacity-20" />
                <img
                  src="/feature-verified.png"
                  alt="Verified Feature"
                  className="relative z-10 w-full drop-shadow-2xl transform scale-135 hover:scale-145 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Servers Section */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <span className="text-[#4ade80] font-pixel text-xs uppercase tracking-wider">Rankings</span>
              <h2 className="font-pixel text-2xl md:text-3xl text-white mt-2">
                {t.home.topServers.title}
              </h2>
            </div>
            <Link href="/servers" className="mt-4 md:mt-0">
              <PixelButton variant="outline" size="sm" icon={<ChevronRight size={14} />}>
                {t.home.topServers.viewAll}
              </PixelButton>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServers.map((server, index) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServerCard {...server} rank={index + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4ade80]/10 to-[#a855f7]/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="font-pixel text-2xl md:text-3xl text-white mb-4">
              {t.home.cta.title}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl">
              {t.home.cta.desc}
            </p>
            <Link href="/servers/add">
              <PixelButton size="lg" icon={<ChevronRight size={18} />}>
                {t.home.cta.button}
              </PixelButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
