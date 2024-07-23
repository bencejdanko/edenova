import MasonryList from '@react-native-seoul/masonry-list';


import { MessageCircle, Ellipsis, EllipsisVertical, Plus, PlusCircle } from 'lucide-react-native';
import {
    SafeAreaView,
    ScrollView,
    Image,
    Touchable,
    TouchableOpacity,
    Modal,
    Dimensions,
    ImageBackground,
    StyleSheet,
} from 'react-native';

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
import { useState } from 'react';

import HomeCard from '~/components/HomeCard';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

import { useColorScheme } from '~/lib/useColorScheme';

import { pb } from '~/lib/pocketbase/utils';



import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function Home() {

    const OverlayMenu = ({ visible, onSelect, items }) => (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setOverlayVisible(false)}
        >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <HomeCard
                    avatar={selectedItem?.avatar}
                    avatarFallback={selectedItem?.avatarFallback}
                    name={selectedItem?.name}
                    postImage={selectedItem?.postImage}
                    aspectRatio={selectedItem?.aspectRatio}
                    likes={selectedItem?.likes}
                    comments={selectedItem?.comments}
                    shares={selectedItem?.shares}
                    description={selectedItem?.description}
                    width={Dimensions.get('window').width / 2 -10}
                />

            </View>
        </Modal>
    );

    const navigation = useNavigation();

    if (!pb.authStore.model) {
        navigation.navigate('Auth');
    }

    const { isDarkColorScheme } = useColorScheme();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const items = [{ label: 'Reaction 1' }, { label: 'Reaction 2' }]; // Example items
    const [selectedItem, setSelectedItem] = useState(null);


    const handleLongPress = (item) => {
        setOverlayVisible(true);
        setSelectedItem(item);
    }

    const handleSelect = (item) => {
        console.log('Selected item:', item);
        setOverlayVisible(false);
    };

    let posts = [{
        id: 1,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x450',
        aspectRatio: 2 / 3,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',

    },

    {
        id: 2,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x600',
        aspectRatio: 1 / 2,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    },


    {
        id: 3,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x400',
        aspectRatio: 3 / 4,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    },

    {
        id: 1,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x450',
        aspectRatio: 2 / 3,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',

    },

    {
        id: 2,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x600',
        aspectRatio: 1 / 2,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    },

    {
        id: 3,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://via.placeholder.com/300x400',
        aspectRatio: 3 / 4,
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='p-3 rounded-none'>
                <View>
                    <Text>{pb.authStore.model?.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity className='mr-5'
                        onPress={() => navigation.navigate('NewPost')}
                    >
                        <PlusCircle size={24} strokeWidth={2} color={isDarkColorScheme ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MessageCircle size={24} strokeWidth={2} color={isDarkColorScheme ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </Card>

            <ScrollView>

                <Card className='rounded-none'>

                    <Card className='rounded-none'>
                        <Text>For you</Text>
                    </Card>

                    <MasonryList
                        data={posts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <TouchableOpacity
                                onLongPress={() => handleLongPress(item)}
                                activeOpacity={0.9}
                            >
                                <HomeCard

                                    avatar={item.avatar}
                                    avatarFallback={item.avatarFallback}
                                    name={item.name}
                                    postImage={item.postImage}
                                    aspectRatio={item.aspectRatio}
                                    likes={item.likes}
                                    comments={item.comments}
                                    shares={item.shares}
                                    description={item.description}
                                    width={width / 2 - 10}
                                />
                            </TouchableOpacity>
                        )}
                    // Add any other props to customize the layout, spacing, etc.
                    />
                </Card>

                {posts.map((post, index) => (
                    <TouchableOpacity
                        onLongPress={() => handleLongPress()}
                        activeOpacity={0.9}
                    >

                        <Card
                            key={index}
                            className='rounded-none'
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar className='m-1' alt={post.avatarFallback} style={{ width: 34, height: 34 }}>
                                        <AvatarImage source={{ uri: post.avatar }} />
                                        <AvatarFallback>
                                            <Text>RS</Text>
                                        </AvatarFallback>
                                    </Avatar>
                                    <Text>{post.name}</Text>
                                </View>

                                <TouchableOpacity className='mr-5'>
                                    <Ellipsis color={isDarkColorScheme ? 'white' : 'black'} />
                                </TouchableOpacity>

                            </View>



                            <Image source={{ uri: post.postImage }} style={{ width: '100%', height: 200 }} />
                            <CardContent className='p-4'>
                                <CardDescription className="text-md">
                                    <Text>{post.description}</Text></CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Text>{post.likes} Likes</Text>
                                <Text>{post.comments} Comments</Text>
                                <Text>{post.shares} Shares</Text>
                            </CardFooter>


                        </Card></TouchableOpacity>

                ))}
            </ScrollView>
            <OverlayMenu visible={overlayVisible} onSelect={handleSelect} items={items} />
        </SafeAreaView>
    );

}
