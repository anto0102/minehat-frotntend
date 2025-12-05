import { NextResponse } from 'next/server';
import { verifyLinkCode } from '@/lib/firebase-db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code, minecraftUuid, minecraftUsername } = body;

        // Validate input
        if (!code || !minecraftUuid || !minecraftUsername) {
            return NextResponse.json(
                { success: false, message: 'Parametri mancanti' },
                { status: 400 }
            );
        }

        // Validate code format (6 digits)
        if (!/^\d{6}$/.test(code)) {
            return NextResponse.json(
                { success: false, message: 'Formato codice non valido' },
                { status: 400 }
            );
        }

        // Verify the code and link the account
        const result = await verifyLinkCode(code, minecraftUuid, minecraftUsername);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying link code:', error);
        return NextResponse.json(
            { success: false, message: 'Errore del server' },
            { status: 500 }
        );
    }
}
