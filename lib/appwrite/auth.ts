import { ClientStore } from "./client";
import { Account, ID, Models, AppwriteException } from "appwrite";

export const authHandler = {
    getMobileToken: async (phone: string): Promise<{ token: Models.Token | null, err: Error | null }> => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const token = await account.createPhoneToken(
                ID.unique(),
                phone,
            );
            return { token, err: null };
        } catch (error) {
            const appwriteError = error as AppwriteException;
            console.log(appwriteError.message);
            return { token: null, err: new Error(appwriteError.message) };
        }
    },

    verifyMobileToken: async (userId: string, secret: string): Promise<{ session: Models.Session | null, err: Error | null }> => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const session = await account.createSession(
                userId,
                secret,
            );
            return { session, err: null };
        } catch (error) {
            const appwriteError = error as AppwriteException;
            console.log(appwriteError.message);
            return { session: null, err: new Error(appwriteError.message) };
        }
    },
};