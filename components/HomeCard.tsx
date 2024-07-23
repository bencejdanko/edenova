import React, { PropsWithChildren } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from './ui/text';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 10; // Two cards per row with some padding
const CARD_HEIGHT = CARD_WIDTH * 1.5; // Aspect ratio 2:3

type Props = {
    avatar: string;
    avatarFallback: string;
    name: string;
    postImage: string;
    aspectRatio: number;
    likes: number;
    comments: number;
    shares: number;
    description: string;
    width: number;
}

const CardWithShadow = (props: Props) => {
    const { avatar, avatarFallback, name, postImage, aspectRatio, likes, comments, shares, description } = props;
    const height = CARD_WIDTH * aspectRatio // width * aspectRatio;	// Calculate the height based on the aspect ratio
    
    return (
        <View style={[styles.card, { height: height }]}>
            
            <ImageBackground
                source={{ uri: postImage }}
                style={styles.image}
                resizeMode='cover'
                imageStyle={styles.imageRadius} // Apply borderRadius to the image
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                    style={styles.shadowTop}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <LinearGradient
                    colors={['#ffffff44', '#00000088']}
                    style={styles.shadowBottom}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <Text>{width}</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 12,
        backgroundColor: 'transparent',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageRadius: {
        borderRadius: 10, // Adjust the border radius to match your card's corners
    },
    shadowTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30, // Adjust the height as needed
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    shadowBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: "30%", // Adjust the height as needed
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
});

export default CardWithShadow;