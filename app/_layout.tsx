import '~/global.css';
import Menu from '~/components/Menu';
import Auth from '~/screens/Auth';
import Home from '~/screens/Home';
import Register from '~/screens/Register';

import { X, Circle, Search, Users } from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider, useNavigationState } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Animated } from 'react-native';
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

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
            }}

          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />



          {/* Add more Tab.Screens as needed */}
        </Stack.Navigator>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <PortalHost />
      </NavigationContainer>
    </ThemeProvider>
  );
}
