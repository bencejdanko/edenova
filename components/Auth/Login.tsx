import { View, SafeAreaView, ScrollView, Dimensions, Animated, TextInput, ActivityIndicator } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import PhoneInput from "react-native-phone-input";
import { useState, useEffect, useRef } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { authHandler } from '~/lib/appwrite/auth';

export default function Login( { navigation }: any) {
    let { width, height } = Dimensions.get('window');

    let [phone, setPhone] = useState('');
    let [phoneValid, setPhoneValid] = useState(false);
    let [step, setStep] = useState(0);
    let [code, setCode] = useState('');
    let [codeError, setCodeError] = useState('');
    let [loadingCodeVerification, setLoadingCodeVerification] = useState(false);
    let [verified, setVerified] = useState(false);
    let [userId, setUserId] = useState('');
    const inputRef = useRef(null);

    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value
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
            navigation.navigate('Welcome');
        }
    };

    const renderCodeBoxes = () => {
        let boxes = [];
        for (let i = 0; i < 6; i++) {
            boxes.push(
                <View key={i}

                    className='border-b-2 border-black w-[40px] h-[50px] flex items-center justify-center'

                >
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

    function enterPhoneNumber() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl mb-5 font-bold'>Enter your phone number</Text>
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
                <Button
                    className='mt-5 rounded-full'
                    disabled={!phoneValid}
                    onPress={() => { setStep(1) }}
                ><Text>Next</Text></Button>
            </Animated.View>
        )
    }

    function confirmCode() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>Confirm your phone number</Text>
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

                    <Button 
                    className='m-5'
                    onPress={async () => {
                        let { token, err } = await authHandler.getMobileToken(phone)
                        if (err || !token) {
                            setCodeError("There was an error contacting your phone number.");
                            navigation.navigate('Welcome');
                            return
                        }
                        setUserId(token.userId);
                    }}><Text>Message me a Code</Text></Button>
                </View>
            </Animated.View>
        )
    }


    return (
        <SafeAreaView className='bg-background' style={{ height: height, flex: 1, justifyContent: 'center' }}>
            <ScrollView >

                {step === 0 && enterPhoneNumber()}
                {step === 1 && confirmCode()}

            </ScrollView>
        </SafeAreaView>
    )
}
