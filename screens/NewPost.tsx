import React, { useState } from 'react';
import { Image, TouchableOpacity, View, ScrollView, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '~/components/ui/card';
import { Plus, X } from 'lucide-react-native';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

import { postHandler } from '~/lib/pocketbase/utils';


export default function NewPost() {
    const [imageUris, setImageUris] = useState([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    function onSubmit() {

        setLoading(true);

        const handlePost = async () => {
            try {
                const response = await postHandler.create(description, imageUris);
                if (response instanceof Error) {
                    console.log(response.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        handlePost();
    }

    const openImagePicker = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const uris = result.assets.map(asset => asset.uri);
            setImageUris(uris);
        } else {
            setImageUris([]);
        }
    };

    let { width, height } = Dimensions.get('window');


    return (
        <SafeAreaView>
            <ScrollView>
                <Card className='rounded-none p-3' style={{ height: height }}>

                    <Textarea
                        placeholder='Add a Description'
                        className='mt-16'
                        style={{ width: '100%', height: 100, padding: 8, borderWidth: 0 }}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Card className='w-[100%] h-[300px] mt-16' style={{ alignItems: 'center', justifyContent: 'center', flexBasis: '33%' }}>
                        {imageUris.length > 0 ? (
                            <ScrollView horizontal>
                                {imageUris.map(uri => (
                                    <Image key={uri} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
                                ))}
                            </ScrollView>
                        ) : (
                            <TouchableOpacity onPress={openImagePicker}>
                                <Plus size={64} />
                            </TouchableOpacity>
                        )}
                    </Card>
                    <TouchableOpacity
                        onPress={() => { setImageUris([]); setDescription(''); }}
                        style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}
                    >
                        <X size={24} color='red' />
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" /> // Step 2: Display a loading icon
                    ) : (
                        <Button 
                            className='mt-16' 
                            onPressIn={onSubmit}
                            disabled={!description || loading} // Disable button when loading
                        >
                            <Text>Post</Text>
                        </Button>
                    )}

                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
