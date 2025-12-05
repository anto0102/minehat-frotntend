import { NextResponse } from 'next/server';
import { checkLinkStatus } from '@/lib/firebase-db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get('uuid');

        if (!uuid) {
            return NextResponse.json(
                { error: 'UUID mancante' },
                { status: 400 }
            );
        }

        const status = await checkLinkStatus(uuid);

        return NextResponse.json(status);
    } catch (error) {
        console.error('Error checking link status:', error);
        return NextResponse.json(
            { error: 'Errore del server' },
            { status: 500 }
        );
    }
}
