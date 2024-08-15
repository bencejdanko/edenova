import * as React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Info } from "lucide-react-native";
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function EdenovaInfo() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const overlayOpacity = React.useRef(new Animated.Value(0)).current;
    const slideUp = React.useRef(new Animated.Value(300)).current; // Start from bottom (e.g., 300px)

    const openModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideUp, {
                toValue: 0,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideUp, {
                toValue: 300, // Same value as initial
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setModalVisible(false));
    };

    return (
        <View style={styles.container}>
            <Button variant='ghost' onPress={openModal}>
                <Info />
            </Button>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} />
                </Animated.View>
                <Animated.View style={[styles.modalView, { transform: [{ translateY: slideUp }] }]}>
                    <Info size={40} color="black" />
                    <Text className='m-5 font-bold text-3xl'>About Edenova</Text>
                    <View>
                        <Text className='text-xl'>1. Submit an application.</Text>
                        <Text className='text-xl'>2. Edenova will review your application.</Text>
                        <Text className='text-xl'>3. Real-time match with a Christian.</Text>
                    </View>
                    <Text className='m-5 font-bold text-3xl text-center'>See the home page for more the next date details.</Text>
                    <Button onPress={closeModal}>
                        <Text>Close</Text>
                    </Button>
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
});
