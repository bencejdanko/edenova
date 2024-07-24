import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '../ui/input';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '~/components/ui/toggle-group';

import { ChevronDown } from 'lucide-react-native';



export default function Register({ navigation }: any) {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(17);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value
    const { isDarkColorScheme } = useColorScheme();
    const [value, setValue] = React.useState<string[]>([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [step]);

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

    function enterName() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>What is your name?</Text>
                <Text className='text-xl mt-3 font-bold'>You cannot change this later.</Text>
                <Input className='mt-5' placeholder='Name' />
            </Animated.View>
        );
    }

    function enterBirthday() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>When is your birthday?</Text>
                <DateTimePicker
                    mode='date'
                    value={new Date()}
                />
            </Animated.View>
        );
    }

    function enterGender() {
        return (
            <Animated.View className='p-3' style={{ opacity: fadeAnim }}>
                <Text className='text-5xl font-bold mr-[20%]'>What is your gender?</Text>
                <ToggleGroup value={value} onValueChange={setValue} type='multiple'>
                    <ToggleGroupItem value='bold' aria-label='Toggle bold'>
                        <ToggleGroupIcon icon={ChevronDown} size={18} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='italic' aria-label='Toggle italic'>
                        <ToggleGroupIcon icon={ChevronDown} size={18} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='underline' aria-label='Toggle underline'>
                        <ToggleGroupIcon icon={ChevronDown} size={18} />
                    </ToggleGroupItem>
                </ToggleGroup>
            </Animated.View>
        );
    }

    function enterPhone() {

    }

    function confirmPhone() {

    }

    function enterPhotos() {

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
                        {step === 2 && enterBirthday()}
                        {step === 3 && enterGender()}
                        {step === 4 && enterPhone()}
                        {step === 5 && confirmPhone()}
                        {step === 6 && enterPhotos()}
                    </View>

                    <View className='ml-5 mr-5' style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        {step > 1 && (
                            <TouchableOpacity onPress={() => { useStep(step - 1); decreaseProgress(17); }}>
                                <CircleChevronLeft size={50} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                            </TouchableOpacity>
                        )}

                        {step === 1 && (
                            <TouchableOpacity onPress={() => { navigation.navigate('Welcome') }}>

                                <CircleChevronLeft size={50} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                            </TouchableOpacity>
                        )}

                        {step < 6 && (
                            <TouchableOpacity onPress={() => { useStep(step + 1); increaseProgress(17); }}>
                                <CircleChevronRight size={50} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}