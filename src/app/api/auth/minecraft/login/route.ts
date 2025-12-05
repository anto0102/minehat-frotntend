import { NextResponse } from 'next/server';
import { MINECRAFT_AUTH_CONFIG } from '@/lib/minecraftAuth';

export async function GET() {
    const params = new URLSearchParams({
        client_id: MINECRAFT_AUTH_CONFIG.clientId,
        response_type: 'code',
        redirect_uri: MINECRAFT_AUTH_CONFIG.redirectUri,
        scope: MINECRAFT_AUTH_CONFIG.scopes.join(' '),
    });

    const url = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?${params.toString()}`;

    return NextResponse.redirect(url);
}
