import PocketBase from 'pocketbase';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import eventsource from "react-native-sse";
global.EventSource = eventsource;


const pb = new PocketBase("https://caring-redbird-immensely.ngrok-free.app");

let status;
console.log(pb.health.check()
    .then((response) => {
        console.log('Server is up and running');
        status = true
    })
    .catch((error) => {
        console.log('Server is down');
        status = false
    })
);

pb.autoCancellation(true);

export { pb, status };

export const postHandler = {

    create: async (description: string, imageUris: string[]) => {
        if (!pb.authStore.model) {
            return new Error('User is not authenticated');
        }

        try {

            const formData = new FormData();
            formData.append('description', description);
            formData.append('user', pb.authStore.model.id);
            imageUris.forEach((uri, index) => {
                //https://github.com/pocketbase/pocketbase/discussions/2002
                //IOS and Android support a special type of image upload
                formData.append("images", {
                    uri: uri,
                    name: 'image' + index,
                    type: 'image/*'
                });
                console.log('Image ' + index + ' added to form data')
            });
            await pb.collection('posts').create(formData);
        } catch (error) {
            console.log(JSON.stringify(error))
            return new Error(error.message);
        }
    },


}

export const authHandler = {

    register: async (email: string, password: string, passwordConfirm: string) => {
        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm
            });
        } catch (error) {
            console.log(JSON.stringify(error))
            return new Error(error.message);
        }
    },

    login: async (email: string, password: string) => {
        try {
            await pb.collection('users').authWithPassword(
                email,
                password
            );
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.response) {
                return new Error(error.response.message);
            }
        }
    },

    googleLogin: async () => {
        try {
            await pb.collection('users').authWithOAuth2({
                provider: 'google',
                urlCallback: (url) => {
                    WebBrowser.openAuthSessionAsync(url)
                        .catch((error) => {
                            return new Error('Error opening browser: ' + error.message);
                        });
                }
            });
        } catch (error) {
        
            console.log(JSON.stringify(error))
            return new Error('Error logging in with Google: ' + error.message);
        }
    },

    logout: async () => {
        try {
            await pb.authStore.clear()
        } catch (error) {
            return new Error('Error logging out user');
        }
    }
}