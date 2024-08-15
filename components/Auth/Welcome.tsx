
import {
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';


import EdenovaLetters from '~/assets/images/EdenovaLetters.svg';
import EdenovaHeart from '~/assets/images/EdenovaHeart.svg';

import { useColorScheme } from '~/lib/useColorScheme';

import {
    CardContent,
} from '~/components/ui/card';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';

import * as React from 'react';

export default function Welcome({ navigation }: any) {
    let { width, height } = Dimensions.get('window');
    const { isDarkColorScheme } = useColorScheme();
    return (
        <SafeAreaView className='bg-background'>
            <ScrollView>
                <View style={{ height: height, flex: 1, justifyContent: 'center' }}>
                    <CardContent>

                        <View className='items-center'>
                            <View className='-m-10'>
                                <EdenovaHeart width={150} height={150} />
                            </View>
                            <EdenovaLetters width={200} height={200} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                        </View>

                        <Button
                            className='rounded-full'
                            onPress={() => { navigation.navigate('Register') }}
                        >
                            <Text>Sign up</Text>
                        </Button>

                        <Button
                            className='mt-3 rounded-full bg-background border border-primary'
                            onPress={() => { navigation.navigate('Login') }}
                            style={{ flexDirection: 'row', justifyContent: 'center' }}
                        >
                            <Text className='text-primary'>Log in</Text>
                        </Button>

                        <View className='p-3'>
                            <Text>By signing up you agree to our Terms. See how we use your data in our Privacy Policy.</Text>
                        </View>

                    </CardContent>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}