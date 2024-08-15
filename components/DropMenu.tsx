import { Menu } from 'lucide-react-native';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useColorScheme } from '~/lib/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { authHandler } from '~/lib/appwrite/auth';

export default function DropMenu() {

    const { isDarkColorScheme } = useColorScheme();
    const navigation = useNavigation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <Menu style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 native:w-72'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Text>Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Text>Support</Text>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onPress={async () => {
                        let { err } = await authHandler.logout();
                        
                        let { session } = await authHandler.getUserSession();
                        if (!session) {
                            navigation.navigate('Auth');
                        }

                    }}
                >
                    <Text
                    >Log out</Text>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}