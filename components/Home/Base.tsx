import { View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '../ui/button';
import { ScrollText } from 'lucide-react-native';
import EdenovaInfo from '../EdenovaInfo';

export default function Base({ navigation }: any) {
    let date = new Date();

    let { width, height } = Dimensions.get('window');

    return (
        <SafeAreaView className='bg-background'>
            <ScrollView className='p-5 mt-5' style={{height: height}}>
                <Text className='text-4xl font-bold'>Welcome to Edenova</Text>
                <View className='mt-20 pt-10 pb-5 border-primary border-2 rounded'>
                    <Text className='text-xl text-blue-500 font-bold text-center'>{date.toUTCString()}</Text>
                    <Button className='m-5 flex flex-row' onPress={() => { navigation.navigate('Application') }}>
                        <Text className='text-lg mr-3'>Edit your application</Text>
                        <ScrollText />
                    </Button>
                </View>

                <View className='mt-5'>
                    <Text className='text-lg'>Prepare your application ahead of time to share with others.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}