import { View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Plus } from 'lucide-react-native';
import { Input } from '../ui/input';


export default function Base({ navigation }: any) {

    const [imageURI, setImageURI] = useState('');
    const name = 'John Doe';
    const date = new Date();
    const birthdate = new Date(1999, 0, 1);
    const age = date.getFullYear() - birthdate.getFullYear();

    const openImagePicker = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageURI(uri);
        } else {
            setImageURI('');
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>

                <View className='flex flex-row'>
                    <TouchableOpacity onPress={openImagePicker} className='basis-1/2 bg-[lightgray] justify-center items-center m-15 aspect-square rounded-full m-5'>
                        {imageURI === '' ? (
                            <Plus style={{ color: 'black' }} />
                        ) : (
                            <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                        )}
                    </TouchableOpacity>
                    <View className='basis-1/2 justify-center'>
                        <Text className='text-3xl'>{name}</Text>
                        <Text className='text-3xl'>{age}</Text>
                    </View>
                </View>

                <View className='flex flex-row items-center justify-center space-x-2'>
                    <TouchableOpacity onPress={openImagePicker} className='basis-1/3 bg-[lightgray] justify-center items-center m-15 aspect-square'>
                        {imageURI === '' ? (
                            <Plus style={{ color: 'black' }} />
                        ) : (
                            <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openImagePicker} className='basis-1/3 bg-[lightgray] justify-center items-center m-15 aspect-square'>
                        {imageURI === '' ? (
                            <Plus style={{ color: 'black' }} />
                        ) : (
                            <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openImagePicker} className='basis-1/3 bg-[lightgray] justify-center items-center m-15 aspect-square'>
                        {imageURI === '' ? (
                            <Plus style={{ color: 'black' }} />
                        ) : (
                            <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                        )}
                    </TouchableOpacity>
                </View>

                <View className='p-2'>
                    <Text className='text-xl'>Short Testimony</Text>
                    <Text className='text-sm'>Share a short testimony about yourself.</Text>
                    <Input
                        editable
                        multiline
                        maxLength={40}
                        className='mt-2 rounded h-[20px]' 
                        placeholder='Type here...' />
                    <Text className='text-sm'>0/40</Text>

                    <Text className='text-xl mt-5'>How is God working with you today?</Text>
                    <Text className='text-sm'>Share a short testimony about your experience with God.</Text>
                    <Input
                        editable
                        multiline
                        maxLength={40}
                        className='mt-2 rounded h-[20px]' 
                        placeholder='Type here...' />
                    <Text className='text-sm'>0/40</Text>

                    <Text className='text-xl mt-5'>Favourite Verse</Text>
                    <Text className='text-sm'>Share a short testimony about your experience with God.</Text>
                    <Input
                        editable
                        multiline
                        maxLength={40}
                        className='mt-2 rounded h-[20px]' 
                        placeholder='Type here...' />
                    <Text className='text-sm'>0/40</Text>

                    <Text className='text-xl mt-5'>What does this Verse mean to you?</Text>
                    <Text className='text-sm'>Share a short testimony about your experience with God.</Text>
                    <Input
                        editable
                        multiline
                        maxLength={40}
                        className='mt-2 rounded h-[20px]' 
                        placeholder='Type here...' />
                    <Text className='text-sm'>0/40</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}