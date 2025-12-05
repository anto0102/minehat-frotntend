import { NextResponse } from 'next/server';
import { generateLinkCode } from '@/lib/firebase-db';

export async function GET(request: Request) {
    try {
        // Get the user ID from the request headers (set by middleware or auth)
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json(
                { error: 'Non autenticato' },
                { status: 401 }
            );
        }

        // Generate a new OTP code
        const { code, expiresAt } = await generateLinkCode(userId);

        return NextResponse.json({
            success: true,
            code,
            expiresAt,
        });
    } catch (error) {
        console.error('Error generating link code:', error);
        return NextResponse.json(
            { error: 'Errore durante la generazione del codice' },
            { status: 500 }
        );
    }
}
