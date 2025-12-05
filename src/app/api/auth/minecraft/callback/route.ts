import { NextResponse } from 'next/server';
import {
    getMicrosoftToken,
    getXboxToken,
    getXstsToken,
    getMinecraftToken,
    getMinecraftProfile
} from '@/lib/minecraftAuth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(new URL('/dashboard?error=no_code', request.url));
    }

    try {
        // 1. Exchange code for Microsoft Token
        const msTokenData = await getMicrosoftToken(code);

        // 2. Exchange MS Token for Xbox Live Token
        const xblData = await getXboxToken(msTokenData.access_token);

        // 3. Exchange XBL Token for XSTS Token
        const xstsData = await getXstsToken(xblData.Token);

        // 4. Exchange XSTS Token for Minecraft Token
        const userHash = xblData.DisplayClaims.xui[0].uhs;
        const mcTokenData = await getMinecraftToken(xstsData.Token, userHash);

        // 5. Get Minecraft Profile
        const profile = await getMinecraftProfile(mcTokenData.access_token);

        // Success! Redirect to dashboard with profile data
        // In a real app, you would save this to your database/session here
        // For now, we'll pass it as a query param (NOT SECURE for production, but good for demo)
        const successUrl = new URL('/dashboard', request.url);
        successUrl.searchParams.set('verified', 'true');
        successUrl.searchParams.set('username', profile.name);
        successUrl.searchParams.set('uuid', profile.id);

        return NextResponse.redirect(successUrl);

    } catch (error) {
        console.error('Minecraft Auth Error:', error);
        return NextResponse.redirect(new URL('/dashboard?error=auth_failed', request.url));
    }
}
