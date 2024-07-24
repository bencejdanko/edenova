import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from '~/components/Auth/Welcome';
import Register from '~/components/Auth/Register';

export default function Auth({ navigation }: any) {
    const Stack = createNativeStackNavigator();
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
                        headerShown: false
                    }
                }
            />
        </Stack.Navigator>
    )
}