import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { app } from './firebase';

const database = getDatabase(app);

// Generate a random 6-digit OTP code
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate and store OTP code for a user
export async function generateLinkCode(userId: string): Promise<{ code: string; expiresAt: number }> {
    const code = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    const codeRef = ref(database, `linkCodes/${code}`);
    await set(codeRef, {
        userId,
        code,
        expiresAt,
        used: false,
        createdAt: Date.now(),
    });

    return { code, expiresAt };
}

// Verify OTP code and link Minecraft account
export async function verifyLinkCode(
    code: string,
    minecraftUuid: string,
    minecraftUsername: string
): Promise<{ success: boolean; message: string; userId?: string }> {
    // Check if code exists
    const codeRef = ref(database, `linkCodes/${code}`);
    const codeSnapshot = await get(codeRef);

    if (!codeSnapshot.exists()) {
        return { success: false, message: 'Codice non valido' };
    }

    const codeData = codeSnapshot.val();

    // Check if code has expired
    if (Date.now() > codeData.expiresAt) {
        await remove(codeRef);
        return { success: false, message: 'Codice scaduto' };
    }

    // Check if code has already been used
    if (codeData.used) {
        return { success: false, message: 'Codice già utilizzato' };
    }

    // Check if this Minecraft UUID is already linked to another account
    const existingLinkRef = ref(database, `minecraftLinks/${minecraftUuid}`);
    const existingLinkSnapshot = await get(existingLinkRef);

    if (existingLinkSnapshot.exists()) {
        const existingLink = existingLinkSnapshot.val();
        if (existingLink.userId !== codeData.userId) {
            return {
                success: false,
                message: 'Questo account Minecraft è già collegato a un altro utente',
            };
        }
        // Already linked to the same user, consider it success
        await remove(codeRef);
        return {
            success: true,
            message: 'Account già collegato',
            userId: codeData.userId,
        };
    }

    // Link the Minecraft account
    const linkRef = ref(database, `minecraftLinks/${minecraftUuid}`);
    await set(linkRef, {
        userId: codeData.userId,
        minecraftUuid,
        minecraftUsername,
        linkedAt: Date.now(),
    });

    // Mark code as used and remove it
    await remove(codeRef);

    return {
        success: true,
        message: 'Account collegato con successo!',
        userId: codeData.userId,
    };
}

// Check if a Minecraft UUID is already linked
export async function checkLinkStatus(minecraftUuid: string): Promise<{
    linked: boolean;
    username?: string;
    userId?: string;
}> {
    const linkRef = ref(database, `minecraftLinks/${minecraftUuid}`);
    const linkSnapshot = await get(linkRef);

    if (!linkSnapshot.exists()) {
        return { linked: false };
    }

    const linkData = linkSnapshot.val();
    return {
        linked: true,
        username: linkData.minecraftUsername,
        userId: linkData.userId,
    };
}

// Get linked Minecraft account for a user
export async function getLinkedMinecraftAccount(userId: string): Promise<{
    linked: boolean;
    minecraftUuid?: string;
    minecraftUsername?: string;
    linkedAt?: number;
}> {
    // Search through all minecraft links to find one with this userId
    const linksRef = ref(database, 'minecraftLinks');
    const linksSnapshot = await get(linksRef);

    if (!linksSnapshot.exists()) {
        return { linked: false };
    }

    const links = linksSnapshot.val();
    for (const uuid in links) {
        if (links[uuid].userId === userId) {
            return {
                linked: true,
                minecraftUuid: uuid,
                minecraftUsername: links[uuid].minecraftUsername,
                linkedAt: links[uuid].linkedAt,
            };
        }
    }

    return { linked: false };
}

// Unlink Minecraft account
export async function unlinkMinecraftAccount(userId: string): Promise<boolean> {
    const linksRef = ref(database, 'minecraftLinks');
    const linksSnapshot = await get(linksRef);

    if (!linksSnapshot.exists()) {
        return false;
    }

    const links = linksSnapshot.val();
    for (const uuid in links) {
        if (links[uuid].userId === userId) {
            const linkRef = ref(database, `minecraftLinks/${uuid}`);
            await remove(linkRef);
            return true;
        }
    }

    return false;
}
