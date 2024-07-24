import { ClientStore } from "./client";
import { Account, ID, Models, AppwriteException } from "appwrite";

export const authHandler = {

    getMobileToken: async (phone: string) => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const token = await account.createPhoneToken(
                ID.unique(),
                phone,
            );
            return token;
        } catch (error) {
            const appwriteError = error as AppwriteException;
            return new Error(appwriteError.message);
        }
    },

    verifyMobileToken: async (phone: string, token: Models.Token) => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const session = await account.createSession(
                phone,
                token.userId,
            );
            return session;
        } catch (error) {
            const appwriteError = error as AppwriteException;
            return new Error(appwriteError.message);
        }
    },


}