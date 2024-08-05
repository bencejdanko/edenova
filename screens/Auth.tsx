import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authHandler } from '~/lib/appwrite/auth';
import Welcome from '~/components/Auth/Welcome';
import Register from '~/components/Auth/Register';
import { X } from 'lucide-react-native';

export default function Auth({ navigation }: any) {
    const Stack = createNativeStackNavigator();

    const userLoggedInPromise = authHandler.getUserSession();
    userLoggedInPromise.then((user) => {
        if (user) {
            navigation.navigate('Home');
        }
    });

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
                            backgroundColor: 'transparent'
                        }
                        
                    }
                }
            />
        </Stack.Navigator>
    )
}