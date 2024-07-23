import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';

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

import { Input } from '~/components/ui/input';

import MapView, { Circle } from 'react-native-maps';
import { Scroll } from 'lucide-react-native';

import { Search, SlidersHorizontal } from 'lucide-react-native';

let forSale = [
    {
        price: 100,
        title: 'headlights',
        description: 'brand new headlights for sale',
        location: 'New York',
        latitude: 40.7128,
        longitude: -74.0060,
        radius: 1000 // in meters
    }
]

export default function Market() {
    return (
        <SafeAreaView>
            <Card className='rounded-none'>
                <View style={styles.searchContainer}>
                    <Input placeholder='Search for items' style={styles.input} />
                    {/* <Search color="gray" size={24} /> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <TouchableOpacity>
                                <SlidersHorizontal color="gray" size={24}></SlidersHorizontal>
                            </TouchableOpacity>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-[100%]'>
                            <DropdownMenuLabel>Filter</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Text>Price</Text>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Text>Low to High</Text>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Text>High to Low</Text>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Text>Location</Text>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Text>Nearest</Text>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Text>Furthest</Text>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>



                </View>
            </Card>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView>
                    {forSale.map((item, index) => (
                        <Card key={index} className='rounded-none'>

                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>

                            </CardHeader>
                            <CardContent>
                                <Text>Price: ${item.price}</Text>
                                <Text>Location: {item.location}</Text>

                            </CardContent>
                            {/* <MapView
                            style={{ height: 200, width: '100%' }}
                            initialRegion={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Circle
                                center={{ latitude: item.latitude, longitude: item.longitude }}
                                radius={item.radius}
                                strokeColor="rgba(0,112,255,0.5)"
                                fillColor="rgba(0,112,255,0.2)"
                            />
                        </MapView> */}
                        </Card>
                    ))}
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    input: {
        flex: 1,
        marginRight: 10, // Adjust the space between the input and the icon as needed
        borderWidth: 0,
    },
});