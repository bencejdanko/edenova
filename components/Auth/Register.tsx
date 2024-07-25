import React, { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, TouchableOpacity, View, Image, TextInput, ActivityIndicator } from 'react-native';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '../ui/input';
import { useColorScheme } from '~/lib/useColorScheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '~/components/ui/toggle-group';
import * as ImagePicker from 'expo-image-picker';

import PhoneInput from "react-native-phone-input";

import Man from '~/assets/images/man.svg'
import Woman from '~/assets/images/woman.svg'
import { Plus, ChevronRight, ChevronLeft } from 'lucide-react-native';

import { authHandler } from '~/lib/appwrite/auth';
import { storageHandler } from '~/lib/appwrite/storage';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default function Register({ navigation }: any) {

    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(17);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value
    const { isDarkColorScheme } = useColorScheme();
    const [gender, setGender] = React.useState<string>("");
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [imageURI, setImageURI] = useState('');

    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState(false);

    const [code, setCode] = useState('');
    const inputRef = useRef(null);

    const [verified, setVerified] = useState(false);
    const [codeError, setCodeError] = useState('');
    const [loadingCodeVerification, setLoadingCodeVerification] = useState(false);

    const [userId, setUserId] = useState("");


    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [step]);

    const handleChangeCode = async (text: string) => {
        if (/^[0-9]*$/.test(text) && text.length <= 6) {
            setCode(text);
        }

        if (text.length === 6) {
            setLoadingCodeVerification(true);
            let { session, err } = await authHandler.verifyMobileToken(userId, text);
            if (err) {
                setCodeError("Error verifying code.");
            } else {
                setVerified(true);
            }
            setLoadingCodeVerification(false);
        }
    };

    const renderCodeBoxes = () => {
        let boxes = [];
        for (let i = 0; i < 6; i++) {
            boxes.push(
                <View key={i} style={{
                    width: 40,
                    height: 50,
                    borderBottomWidth: 2,
                    borderBottomColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextInput
                        style={{
                            fontSize: 24,
                            textAlign: 'center',
                        }}
                        value={code[i] || ''}
                        editable={false}
                    />
                </View>
            );
        }
        return boxes;
    };

    function increaseProgress(increaseBy: number) {
        let incremented = 0;
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (incremented >= increaseBy) {
                    clearInterval(interval);
                    return prevProgress;
                }
                incremented += 1;
                return prevProgress + 1;
            });
        }, 10); // Adjust the interval time as needed
    }

    function decreaseProgress(decreaseBy: number) {
        let decremented = 0;
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (decremented >= decreaseBy) {
                    clearInterval(interval);
                    return prevProgress;
                }
                decremented += 1;
                return prevProgress - 1;
            });
        }, 10); // Adjust the interval time as needed
    }

    const useStep = (newStep: number) => {
        setStep(newStep);
        fadeAnim.setValue(0); // Reset opacity for new animation
    };

    const openImagePicker = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageURI(uri);
        } else {
            setImageURI('');
        }
    };

    function enterName() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>What is your name?</Text>
                <Text className='text-xl mt-3 font-bold'>You cannot change this later.</Text>
                <Input className='mt-5' placeholder='Name' defaultValue={name} onChangeText={text => setName(text)} />
                <Text className='text mt-3 font-bold'>This will appear publicly.</Text>

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <View></View>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        disabled={name == ''}
                        onPress={() => { useStep(step + 1); increaseProgress(17); }}
                    >
                        <ChevronRight style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                </View>

            </Animated.View>
        );
    }

    function enterDob() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>When were you born?</Text>

                <Text className='text mt-3 font-bold'>You must be at least 18 to use this app.</Text>
                <View className='mt-10' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <DateTimePicker
                        mode='date'
                        value={date}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                        }}
                    />
                </View>

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        onPress={() => { useStep(step - 1); decreaseProgress(17); }}
                    >
                        <ChevronLeft style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        disabled={date > new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
                        onPress={() => { useStep(step + 1); increaseProgress(17); }}
                    >
                        <ChevronRight style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                </View>

            </Animated.View>
        );
    }

    function enterGender() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>What is your gender?</Text>
                <ToggleGroup value={gender} onValueChange={setGender} type='single' className='p-5'>
                    <ToggleGroupItem value='m' aria-label='Toggle bold' className={`w-[100px] aspect-square ${gender === 'm' ? 'bg-[gray]' : 'bg-[lightgray]'}`}>
                        <Man style={{ color: 'black' }} />
                        <Text>Man</Text>
                    </ToggleGroupItem>

                    <ToggleGroupItem value='w' aria-label='Toggle italic' className={`w-[100px] aspect-square ${gender === 'w' ? 'bg-[gray]' : 'bg-[lightgray]'}`}>
                        <Woman style={{ color: 'black' }} />
                        <Text>Woman</Text>
                    </ToggleGroupItem>
                    <ToggleGroupItem value='o' aria-label='Toggle underline' className={`w-[100px] aspect-square ${gender === 'o' ? 'bg-[gray]' : 'bg-[lightgray]'}`}>
                        <Plus style={{ color: 'black' }} />
                        <Text>Other</Text>
                    </ToggleGroupItem>
                </ToggleGroup>

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        onPress={() => { useStep(step - 1); decreaseProgress(17); }}
                    >
                        <ChevronLeft style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        disabled={gender == ''}
                        onPress={() => { useStep(step + 1); increaseProgress(17); }}
                    >
                        <ChevronRight style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                </View>

            </Animated.View>
        );
    }


    function enterPhotos() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>Upload a profile picture</Text>
                <Text className='text mt-3 font-bold mr-[30%]'>You'll be able to upload more photos later.</Text>

                <View>
                    <TouchableOpacity onPress={openImagePicker}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', margin: 15, }}>
                                {imageURI === '' ? (
                                    <Plus style={{ color: 'black' }} />
                                ) : (
                                    <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        onPress={() => { useStep(step - 1); decreaseProgress(17); }}
                    >
                        <ChevronLeft style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        disabled={imageURI == ''}
                        onPress={() => { useStep(step + 1); increaseProgress(17); }}
                    >
                        <ChevronRight style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                </View>

            </Animated.View>
        )
    }

    function enterPhone() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>What is your phone number?</Text>
                <View className='p-5'>
                    <PhoneInput
                        initialValue={phone}
                        initialCountry={'us'}
                        ref={(ref) => { this.phone = ref; }}
                        textProps={{
                            placeholder: 'Phone number',
                            keyboardType: 'phone-pad',
                            style: { fontSize: 20 }
                        }}
                        autoFormat={true}
                        onChangePhoneNumber={(text: string) => {
                            setPhone(parsePhoneNumberFromString(text, 'US')?.number || '');
                            setPhoneValid(this.phone.isValidNumber())
                        }}
                    />
                </View>
                <Text className='text mt-3 font-bold'>We will send you a verification code.</Text>

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        onPress={() => { useStep(step - 1); decreaseProgress(17); }}
                    >
                        <ChevronLeft style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>

                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        disabled={!phoneValid}
                        onPress={async () => { 
                            useStep(step + 1); 
                            increaseProgress(17); 
                            let { token, err } = await authHandler.getMobileToken(phone);
                            if (err) {
                                console.log(err);
                            } else {
                                setUserId(token?.userId || '');
                            }
                        }}
                    >
                        <ChevronRight style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                </View>
            </Animated.View>
        );
    }

    function confirmPhone() {

        return (

            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>Enter the code we sent you</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            position: 'absolute',
                            width: 0,
                            height: 0,
                            opacity: 0,
                        }}
                        value={code}
                        onChangeText={handleChangeCode}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete="sms-otp"
                        ref={inputRef}
                        autoFocus={true}
                        caretHidden={true}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '80%',
                    }}
                        onTouchStart={() => inputRef.current.focus()}
                    >
                        {renderCodeBoxes()}
                    </View>

                    {loadingCodeVerification && (
                        <ActivityIndicator className='mt-5' size='large' color='black' />
                    )}

                    {codeError != '' && (
                        <Text className='text mt-3 font-bold'>Invalid code.</Text>
                    )}

                    {verified && (
                        <Text className='text-500-green mt-3 font-bold'>Code verified.</Text>
                    )

                    }

                </View>

                <View className='mt-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Button
                        className='rounded-full aspect-square w-[50px]'
                        onPress={() => { useStep(step - 1); decreaseProgress(17); }}
                    >
                        <ChevronLeft style={{ color: isDarkColorScheme ? 'black' : 'white' }} />
                    </Button>
                    <Button
                        className='rounded-full'
                        disabled={!verified}
                        onPress={async () => { 
                            setLoadingCodeVerification(true);
                            try {
                                await authHandler.addUserToDatabase(userId, name, date.toISOString(), gender, imageURI);
                                useStep(step + 1);
                                increaseProgress(17);
                            } catch (error) {
                                setCodeError("There was an error creating your account.");
                            }
                            setLoadingCodeVerification(false);
                        }}
                    >
                        <Text style={{ color: isDarkColorScheme ? 'black' : 'white' }}>Finish</Text>
                    </Button>
                </View>
            </Animated.View>
        )
    }

    function confirmationScreen() {
        return (
            <View className='p-2'>
                <Text className='text-5xl font-bold mr-[20%]'>You're all set!</Text>
                <Text className='font-bold'>Your account is ready to go.</Text>

                <View className='pt-5' style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: imageURI }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                    <Text className='text-2xl font-bold ml-5'>{name}</Text>
                    <Text className='text-2xl font-bold ml-5'>{gender}</Text>
                    <Text className='text-2xl font-bold ml-5'>{phone}</Text>
                </View>

                <Button
                    className='mt-5'
                    onPress={() => { navigation.navigate('Welcome') }}
                >
                    <Text style={{ color: isDarkColorScheme ? 'black' : 'white' }} >Go to home</Text>
                </Button>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className='mt-5' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Progress value={progress} style={{ width: '90%', height: 10, backgroundColor: 'lightgray' }} />
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                    <View style={{ padding: 15 }}>
                        {step === 1 && enterName()}
                        {step === 2 && enterDob()}
                        {step === 3 && enterGender()}
                        {step === 4 && enterPhotos()}
                        {step === 5 && enterPhone()}
                        {step === 6 && confirmPhone()}
                        {step === 7 && confirmationScreen()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}