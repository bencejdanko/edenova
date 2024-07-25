import { Account, Client } from "react-native-appwrite";

class ClientStore {
    private static _client: Client | undefined;
    private static _jwt: string | undefined;

    private constructor() { }

    public static getClient(): Client {
        if (!this._client) {
            this._client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
                .setProject('65ee67b7a3ee901fd359'); // Your project ID
        }
        return this._client;
    }
}

export { ClientStore };