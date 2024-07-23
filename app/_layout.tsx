import '~/global.css';
import Menu from '~/components/Menu';
import Auth from '~/screens/Auth';
import Home from '~/screens/Home';
import NewPost from '~/screens/NewPost';
import Market from '~/screens/Market';
import Community from '~/screens/Community';
import XButtonHome from '~/components/XButtonHome';

import { X, Circle, Search, Users } from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider, useNavigationState } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '~/components/primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={Auth}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
      </Stack.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeStack"
          component={Home}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
      </Stack.Navigator>
    );
  }

  function NewPostStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NewPostStack"
          component={NewPost}
          options={{
            headerShown: true,
            title: 'New post',
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <XButtonHome />,
            headerTitleStyle: {
              color: isDarkColorScheme ? '#fff' : '#000',
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function CommunityStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CommunityStack"
          component={Community}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
      </Stack.Navigator>
    );
  }

  function MarketStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MarketStack"
          component={Market}
          options={{
            headerShown: true,
            title: null,
            headerStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
            },
            headerLeft: () => <Menu />,
            headerRight: () => <ThemeToggle />,
            animation: 'spring',
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: isDarkColorScheme ? '#000' : '#fff',
              color: isDarkColorScheme ? '#fff' : '#000',
              display: useNavigationState((state) => {
                return route.name === 'Auth' || route.name === 'NewPost' ? 'none' : 'flex';
              }),
            },
            tabBarShowLabel: false,

          })}
        >
          <Tab.Screen
            name="Auth"
            component={AuthStack}
            options={{
              tabBarButton: (props) => null,
              tabBarStyle: { display: 'none' }
            }}

          />
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => <Circle name="home" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="NewPost"
            component={NewPostStack}
            options={{
              tabBarButton: (props) => null,
              tabBarStyle: { display: 'none' }
            }}
          />

          <Tab.Screen
            name="Market"
            component={MarketStack}
            options={{
              tabBarIcon: ({ color, size }) => <Search name="market" color={color} size={size} />,
            }}
          />

          <Tab.Screen
            name='Community'
            component={CommunityStack}
            options={{
              tabBarIcon: ({ color, size }) => <Users name='community' color={color} size={size} />
            }}
          />

          {/* Add more Tab.Screens as needed */}
        </Tab.Navigator>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <PortalHost />
      </NavigationContainer>
    </ThemeProvider>
  );
}
