import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Base({ navigation }: any) {
    return (
        <View className='p-5 mt-5'>
            <Text className='text-5xl'>Welcome to Edenova.</Text>
            <View className='mt-20 p-8 border-primary border-2'>
                <Text>Next session:</Text>
            </View>
        </View>
    )
}