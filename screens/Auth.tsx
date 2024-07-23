import {
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';

import FacebookLogo from '~/assets/images/meta-icon.svg';
import GoogleLogo from '~/assets/images/Google__G__logo.svg';
import AppleLogo from '~/assets/images/Apple_logo_black.svg';

import { useColorScheme } from '~/lib/useColorScheme';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import * as React from 'react';

import { pb, authHandler } from '~/lib/pocketbase/utils';

export default function Auth({ navigation }: any) {

    if (pb.authStore.model) {
        navigation.navigate('Home');
    }

    const { isDarkColorScheme } = useColorScheme();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [error, setError] = React.useState('');
    const [authModel, setAuthModel] = React.useState(pb.authStore.model);

    const onSubmit = async () => {
        if (register) {
            let result = await authHandler.register(email, password, confirmPassword);
            if (result instanceof Error) {
                setError(result.message)
                return;
            }
            navigation.navigate('Home');
        } else {
            let result = await authHandler.login(email, password);
            if (result instanceof Error) {
                setError(result.message)
                return;
            }
            navigation.navigate('Home');
        }
    }

    const googleLogin = async () => {
        let result = await authHandler.googleLogin();
        if (result instanceof Error) {
            setError(result.message)
            return;
        }
        navigation.navigate('Home');
    }

    let { width, height } = Dimensions.get('window');
    height = height - 50;

    return (
        <SafeAreaView>
            <ScrollView>
                <Card style={{ height: height, flex: 1, justifyContent: 'center' }} className='rounded-none'>
                    <CardContent>

                        <Input
                            className='mt-3'
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}

                        />
                        <Input
                            className='mt-3'
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}

                        />

                        {register &&
                            <Input
                                className='mt-3'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={true}

                            />
                        }


                        <Button
                            className='mt-3'
                            onPress={() => { onSubmit() }}
                            disabled={!email || !password || (register && !confirmPassword)}
                        >
                            <Text>{register ? 'Register' : 'Login'}</Text>
                        </Button>

                        <Text
                            className='text-[#60aeff] mt-2'
                            style={{ textAlign: 'right' }}
                            onPress={() => { console.log('forgot password') }}
                        >
                            Forgot password?
                        </Text>


                        <Text className='text-red-500'>{error}</Text>

                        <Separator className='mt-3' />

                        <Button
                            className='mt-3'
                            onPress={() => { googleLogin() }}
                            style= {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <GoogleLogo style={{width: 24, height: 24}}/>
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
                            onPress={() => { console.log('facebook') }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <FacebookLogo style={{ width: 24, height: 24 }}  />
                            <Text>Facebook</Text>
                        </Button>

                        <Separator className='mt-3' />

                        <Text className='mt-3'>
                            {register ? 'Already have an account?' : 'Don\'t have an account yet?'}
                            {'\u00A0'}
                            <Text
                                className='text-[#60aeff]'
                                onPress={() => { setRegister(!register) }}
                            >
                                {register ? 'Login' : 'Register'} now!
                            </Text>
                        </Text>

                        {authModel?.email &&
                            <Text>
                                Logged in as: {authModel.email}
                            </Text>
                        }
                    </CardContent>
                </Card>

            </ScrollView>
        </SafeAreaView>
    )
}