import Edenova from '~/assets/images/edenova.svg';
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


export default function Menu() {

    const { isDarkColorScheme } = useColorScheme();
    const navigation = useNavigation();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <Edenova width={100} height={100} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 native:w-72'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Text>Invite users</Text>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <Animated.View entering={FadeIn.duration(200)}>
                                <DropdownMenuItem>
                                    <Text>Email</Text>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Text>Message</Text>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Text>More...</Text>
                                </DropdownMenuItem>
                            </Animated.View>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Text>Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Text>Support</Text>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Text>API</Text>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onPress={() => {
                        navigation.navigate('Auth');
                    }}
                >
                    <Text
                    >Log out</Text>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}