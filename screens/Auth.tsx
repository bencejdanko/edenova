import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authHandler } from '~/lib/appwrite/auth';
import Welcome from '~/components/Auth/Welcome';
import Register from '~/components/Auth/Register';
import Login from '~/components/Auth/Login';
import { StarHalfIcon, X } from 'lucide-react-native';
import React, { useEffect } from 'react';

export default function Auth({ navigation }: any) {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        
        async function checkUserSession() {
            let {session, err} = await authHandler.getUserSession();
            if (!err) {
                navigation.navigate('Home');
            }
        }

        checkUserSession();
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Welcome" 
                component={Welcome}
                options={
                    {
                        headerShown: false
                    }
                } 
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={
                    {
                        headerShadowVisible: false,
                        headerShown: true,
                        title: null,
                        headerLeft: () => (
                            <X
                                onPress={() => navigation.navigate('Welcome')}
                                style={{ marginRight: 10 }}
                                color='black'
                            />
                        ),
                        headerStyle: {
                            backgroundColor: 'hsl(var(--background))'
                            
                        }
                    }
                }
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={
                    {
                        headerShadowVisible: false,
                        headerShown: true,
                        title: null,
                        headerLeft: () => (
                            <X
                                onPress={() => navigation.navigate('Welcome')}
                                style={{ marginRight: 10 }}
                                color='black'
                            />
                        ),
                        headerStyle: {
                            backgroundColor: 'hsl(var(--background))'
                        }
                    }
                }
            />
        </Stack.Navigator>
    )
}