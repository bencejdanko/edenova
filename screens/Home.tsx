import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Menu from "~/components/Menu";
import { Info, Heart, Users, Settings } from "lucide-react-native";

import Base from "~/components/Home/Base";
import Application from "~/components/Home/Application";
import Connections from "~/components/Home/Connections";


export default function Home({ navigation }: any) {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Base" 
                component={Base} 
                options={{
                    headerShown: true,
                    title: "",
                    headerLeft: () => <Menu />,
                    headerRight: () => <Info />,
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    tabBarIcon: () => <Heart />
                }}
                />

            <Tab.Screen
                name='Community'
                component={Connections}
                options={{
                    headerShown: true,
                    title: "",
                    headerLeft: () => <Menu />,
                    headerRight: () => <Info />,
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    tabBarIcon: () => <Users />
                }}
            />

            <Tab.Screen 
                name="Application" 
                component={Application} 
                options={{
                    headerShown: true,
                    title: "",
                    headerLeft: () => <Menu />,
                    headerRight: () => <Info />,
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    tabBarIcon: () => <Settings />
                }}
                
                />
        </Tab.Navigator>
    );
}