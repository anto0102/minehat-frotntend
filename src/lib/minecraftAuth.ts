export const MINECRAFT_AUTH_CONFIG = {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/minecraft/callback`,
    scopes: ['XboxLive.Signin', 'offline_access', 'openid', 'profile', 'email'],
};

export async function getMicrosoftToken(code: string) {
    const params = new URLSearchParams({
        client_id: MINECRAFT_AUTH_CONFIG.clientId,
        client_secret: MINECRAFT_AUTH_CONFIG.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: MINECRAFT_AUTH_CONFIG.redirectUri,
        scope: MINECRAFT_AUTH_CONFIG.scopes.join(' '),
    });

    const response = await fetch('https://login.microsoftonline.com/consumers/oauth2/v2.0/token', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('getMicrosoftToken failed:', response.status, errorText);
        throw new Error(`Failed to get Microsoft token: ${response.status} ${errorText}`);
    }
    return response.json();
}

export async function getXboxToken(microsoftAccessToken: string) {
    const response = await fetch('https://user.auth.xboxlive.com/user/authenticate', {
        method: 'POST',
        body: JSON.stringify({
            Properties: {
                AuthMethod: 'RPS',
                SiteName: 'user.auth.xboxlive.com',
                RpsTicket: `d=${microsoftAccessToken}`,
            },
            RelyingParty: 'http://auth.xboxlive.com',
            TokenType: 'JWT',
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('getXboxToken failed:', response.status, errorText);
        throw new Error(`Failed to get Xbox token: ${response.status} ${errorText}`);
    }
    return response.json();
}

export async function getXstsToken(xblToken: string) {
    const response = await fetch('https://xsts.auth.xboxlive.com/xsts/authorize', {
        method: 'POST',
        body: JSON.stringify({
            Properties: {
                SandboxId: 'RETAIL',
                UserTokens: [xblToken],
            },
            RelyingParty: 'rp://api.minecraftservices.com/',
            TokenType: 'JWT',
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('getXstsToken failed:', response.status, errorText);
        throw new Error(`Failed to get XSTS token: ${response.status} ${errorText}`);
    }
    return response.json();
}

export async function getMinecraftToken(xstsToken: string, userHash: string) {
    const response = await fetch('https://api.minecraftservices.com/authentication/login_with_xbox', {
        method: 'POST',
        body: JSON.stringify({
            identityToken: `XBL3.0 x=${userHash};${xstsToken}`,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('getMinecraftToken failed:', response.status, errorText);
        throw new Error(`Failed to get Minecraft token: ${response.status} ${errorText}`);
    }
    return response.json();
}

export async function getMinecraftProfile(accessToken: string) {
    const response = await fetch('https://api.minecraftservices.com/minecraft/profile', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('getMinecraftProfile failed:', response.status, errorText);
        throw new Error(`Failed to get Minecraft profile: ${response.status} ${errorText}`);
    }
    return response.json();
}
