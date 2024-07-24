
import {
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';

import FacebookLogo from '~/assets/images/meta-icon.svg';
import GoogleLogo from '~/assets/images/Google__G__logo.svg';
import AppleLogo from '~/assets/images/Apple_logo_black.svg';

import Edenova from '~/assets/images/edenova.svg';

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
        <SafeAreaView>
            <ScrollView>
                <View style={{ height: height, flex: 1, justifyContent: 'center' }}>
                    <CardContent>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Edenova width={200} height={200} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                        </View>

                        <Button
                            className='mt-3'
                            onPress={() => { navigation.navigate('Register') }}
                            style={{ flexDirection: 'row', justifyContent: 'center'  }}
                        >
                            <Text>Use mobile number</Text>
                        </Button>

                        <Button
                            className='mt-3'
                            onPress={() => {  }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <GoogleLogo style={{ width: 24, height: 24 }} />
                            <Text>Google</Text>
                        </Button>
                        <Button
                            className='mt-3'
                            onPress={() => { console.log('Apple') }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <AppleLogo style={{ width: 24, height: 24, color: isDarkColorScheme ? 'black' : 'white' }} />
                            <Text>Apple</Text>
                        </Button>

                        <Button
                            className='mt-3'
                            onPress={() => { console.log('Apple') }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <FacebookLogo style={{ width: 24, height: 24, color: isDarkColorScheme ? 'black' : 'white' }} />
                            <Text>Facebook</Text>
                        </Button>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>By signing up you agree to our Terms. See how we use your data in our Privacy Policy.</Text>
                        </View>

                    </CardContent>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}