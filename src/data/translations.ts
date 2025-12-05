export const translations = {
    it: {
        nav: {
            home: 'Home',
            servers: 'Server',
            leaderboard: 'Classifica',
            addServer: 'Aggiungi Server',
            login: 'Accedi',
        },
        home: {
            hero: {
                title1: 'IL MIGLIOR',
                title2: 'MODO PER TROVARE',
                title3: 'SERVER.',
                subtitle: 'Scopri il server Minecraft perfetto per te. Vota, recensisci e connettiti con una fantastica community di gioco.',
                getStarted: 'Inizia',
                addServer: 'Aggiungi il tuo Server',
            },
            stats: {
                players: 'Giocatori Attivi',
                servers: 'Server Listati',
                votes: 'Voti Dati',
            },
            features: {
                title: 'Perché scegliere MineHat?',
                boost: {
                    title: 'Potenzia il tuo Server',
                    desc: 'Ottieni più giocatori scalando le classifiche con il nostro sistema di voto.',
                },
                stats: {
                    title: 'Statistiche in Tempo Reale',
                    desc: 'Monitora lo stato del server, il conteggio dei giocatori e i voti in tempo reale.',
                },
                verified: {
                    title: 'Server Verificati',
                    desc: 'I server premium sono verificati per qualità e sicurezza.',
                },
            },
            topServers: {
                title: 'Migliori Server',
                viewAll: 'Vedi Tutti',
            },
            cta: {
                title: 'Pronto a Listare il tuo Server?',
                desc: 'Unisciti a migliaia di proprietari di server e fatti scoprire dai giocatori di tutto il mondo. È gratis e richiede solo un minuto!',
                button: 'Aggiungi il tuo Server Ora',
            },
        },
        leaderboard: {
            title: 'Trova il tuo Server',
            leaderboardTitle: 'Classifica',
            subtitle: 'Sfoglia tra {count}+ server e trova quello perfetto per te.',
            searchPlaceholder: 'Cerca server...',
            filters: {
                label: 'Filtri',
                all: 'Tutti i Server',
                premium: 'Premium',
                new: 'Nuovi',
            },
            sort: {
                votes: 'Più Votati',
                players: 'Più Giocatori',
                rating: 'Valutazione Migliore',
                newest: 'Più Recenti',
            },
            results: {
                found: 'Trovati',
                clear: 'Cancella ricerca',
                noResults: 'Nessun server trovato',
                tryAdjusting: 'Prova a modificare la ricerca o i filtri per trovare quello che cerchi.',
            },
        },
        serverCard: {
            copyIp: 'Copia IP',
            copied: 'Copiato!',
            vote: 'Vota',
            players: 'Giocatori',
            version: 'Versione',
            premium: 'Premium',
            new: 'Nuovo',
        },
    },
    en: {
        nav: {
            home: 'Home',
            servers: 'Servers',
            leaderboard: 'Leaderboard',
            addServer: 'Add Server',
            login: 'Login',
        },
        home: {
            hero: {
                title1: 'THE BEST',
                title2: 'WAY TO FIND',
                title3: 'SERVERS.',
                subtitle: 'Discover the perfect Minecraft server for you. Vote, review, and connect with an amazing gaming community.',
                getStarted: 'Get Started',
                addServer: 'Add Your Server',
            },
            stats: {
                players: 'Active Players',
                servers: 'Servers Listed',
                votes: 'Votes Cast',
            },
            features: {
                title: 'Why Choose MineHat?',
                boost: {
                    title: 'Boost Your Server',
                    desc: 'Get more players by climbing the rankings with our voting system.',
                },
                stats: {
                    title: 'Real-time Stats',
                    desc: 'Monitor your server status, player count, and votes in real-time.',
                },
                verified: {
                    title: 'Verified Servers',
                    desc: 'Premium servers are verified for quality and security.',
                },
            },
            topServers: {
                title: 'Top Servers',
                viewAll: 'View All',
            },
            cta: {
                title: 'Ready to List Your Server?',
                desc: 'Join thousands of server owners and get discovered by players worldwide. It\'s free and only takes a minute!',
                button: 'Add Your Server Now',
            },
        },
        leaderboard: {
            title: 'Find Your Server',
            leaderboardTitle: 'Leaderboard',
            subtitle: 'Browse through {count}+ servers and find the perfect one for you.',
            searchPlaceholder: 'Search servers...',
            filters: {
                label: 'Filters',
                all: 'All Servers',
                premium: 'Premium',
                new: 'New',
            },
            sort: {
                votes: 'Most Voted',
                players: 'Most Players',
                rating: 'Highest Rated',
                newest: 'Newest',
            },
            results: {
                found: 'Found',
                clear: 'Clear search',
                noResults: 'No servers found',
                tryAdjusting: 'Try adjusting your search or filters to find what you\'re looking for.',
            },
        },
        serverCard: {
            copyIp: 'Copy IP',
            copied: 'Copied!',
            vote: 'Vote',
            players: 'Players',
            version: 'Version',
            premium: 'Premium',
            new: 'New',
        },
    },
};

export type Language = 'it' | 'en';
export type TranslationKey = keyof typeof translations.it;
