// Sample data for the servers
export interface Server {
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
    tags: string[];
    version: string;
    website?: string;
    discord?: string;
    createdAt: string;
    status?: 'online' | 'offline';
}

export const mockServers: Server[] = [
    {
        id: '1',
        name: 'HyperCraft Network',
        description: 'The ultimate survival experience with custom plugins, amazing community, and regular events. Join thousands of players in our unique world!',
        ip: 'play.hypercraft.net',
        players: { online: 1247, max: 5000 },
        votes: 15420,
        rating: 4.8,
        category: 'Survival',
        imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800',
        isPremium: true,
        tags: ['survival', 'economy', 'mcmmo', 'claims'],
        version: '1.20.4',
        website: 'https://hypercraft.net',
        discord: 'https://discord.gg/hypercraft',
        createdAt: '2021-03-15',
    },
    {
        id: '2',
        name: 'SkyWars Empire',
        description: 'Competitive SkyWars with ranked seasons, custom kits, and incredible maps. Climb the leaderboards and become a champion!',
        ip: 'mc.skywars-empire.com',
        players: { online: 892, max: 2000 },
        votes: 12350,
        rating: 4.7,
        category: 'PvP',
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0b?w=800',
        isPremium: true,
        tags: ['skywars', 'pvp', 'ranked', 'competitive'],
        version: '1.20.4',
        createdAt: '2020-08-22',
    },
    {
        id: '3',
        name: 'BlockParadise',
        description: 'The most feature-rich Skyblock server with custom islands, unique bosses, and an amazing economy system.',
        ip: 'skyblock.paradise.gg',
        players: { online: 654, max: 1500 },
        votes: 9870,
        rating: 4.6,
        category: 'Skyblock',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        tags: ['skyblock', 'economy', 'custom islands', 'bosses'],
        version: '1.20.2',
        createdAt: '2022-01-10',
    },
    {
        id: '4',
        name: 'PixelWorld Creative',
        description: 'Unlimited creativity with WorldEdit, custom plots, and building competitions. Perfect for architects and artists!',
        ip: 'creative.pixelworld.io',
        players: { online: 234, max: 500 },
        votes: 5430,
        rating: 4.5,
        category: 'Creative',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        isNew: true,
        tags: ['creative', 'plots', 'worldedit', 'building'],
        version: '1.20.4',
        createdAt: '2024-01-05',
    },
    {
        id: '5',
        name: 'Factions United',
        description: 'Classic factions gameplay with raids, cannons, and intense PvP. Build your empire and conquer the world!',
        ip: 'factions.united.net',
        players: { online: 567, max: 1000 },
        votes: 7650,
        rating: 4.4,
        category: 'Factions',
        tags: ['factions', 'raiding', 'pvp', 'cannons'],
        version: '1.19.4',
        createdAt: '2019-11-30',
    },
    {
        id: '6',
        name: 'MiniGames Central',
        description: 'Over 50 unique minigames including BedWars, Murder Mystery, Build Battle, and more! Fun for everyone.',
        ip: 'play.minigames.cc',
        players: { online: 1890, max: 3000 },
        votes: 18200,
        rating: 4.9,
        category: 'Minigames',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
        isPremium: true,
        tags: ['bedwars', 'murder mystery', 'build battle', 'fun'],
        version: '1.20.4',
        website: 'https://minigames.cc',
        createdAt: '2018-06-01',
    },
    {
        id: '7',
        name: 'Vanilla+ Experience',
        description: 'Pure vanilla gameplay enhanced with quality of life features. No pay-to-win, just great community.',
        ip: 'vanilla.plusmc.net',
        players: { online: 89, max: 200 },
        votes: 2340,
        rating: 4.7,
        category: 'Survival',
        isNew: true,
        tags: ['vanilla', 'survival', 'community', 'no p2w'],
        version: '1.20.4',
        createdAt: '2024-02-01',
    },
    {
        id: '8',
        name: 'Prison Break',
        description: 'The most engaging prison server with unique mines, custom enchants, and an rewarding prestige system.',
        ip: 'prison.breakmc.com',
        players: { online: 445, max: 800 },
        votes: 6780,
        rating: 4.3,
        category: 'Prison',
        tags: ['prison', 'mines', 'enchants', 'prestige'],
        version: '1.20.2',
        createdAt: '2021-09-15',
    },
];

export const categories = [
    'All',
    'Survival',
    'Skyblock',
    'PvP',
    'Creative',
    'Factions',
    'Minigames',
    'Prison',
    'Modded',
    'Anarchy',
];

export const reviews = [
    {
        id: '1',
        serverId: '1',
        username: 'CraftMaster99',
        avatar: '🧑‍🦰',
        rating: 5,
        content: 'Best survival server I have ever played on! The community is amazing and the staff are super helpful.',
        date: '2024-02-28',
        helpful: 45,
    },
    {
        id: '2',
        serverId: '1',
        username: 'BlockBuilder',
        avatar: '👷',
        rating: 4,
        content: 'Great server overall. The economy is well balanced and there are plenty of things to do. Minor lag sometimes.',
        date: '2024-02-25',
        helpful: 23,
    },
    {
        id: '3',
        serverId: '1',
        username: 'SteveThePlayer',
        avatar: '🧔',
        rating: 5,
        content: 'Been playing here for 2 years now. This is my home server. Highly recommend it to everyone!',
        date: '2024-02-20',
        helpful: 67,
    },
];
