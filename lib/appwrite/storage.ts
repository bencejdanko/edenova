import { Storage, ImageGravity } from 'react-native-appwrite';
import { ClientStore } from './client';

export const storageHandler = {
    getProfilePicPreview: (fileId: string) => {
        const client = ClientStore.getClient();
        const storage = new Storage(client);

        const previewParams = {
            bucketId: '66a1de32000d3e999028',
            fileId: fileId,
            width: 200,
            height: 0,
            gravity: ImageGravity.Center,
            quality: 90,
        };

        const result = storage.getFilePreview(
            previewParams.bucketId,
            previewParams.fileId,
            previewParams.width,
            previewParams.height,
            previewParams.gravity,
            previewParams.quality,
        );

        return result;
        
    },
}