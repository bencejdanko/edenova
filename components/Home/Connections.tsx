import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '../ui/button';

export default function Base({ navigation }: any) {
    let date = new Date();

    return (
        <View className='p-5 mt-5'>
            <Text>Connections</Text>
        </View>
    )
}