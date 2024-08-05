import { View, SafeAreaView } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Base({ navigation }: any) {
    return (
        <SafeAreaView>
            <Text>Application</Text>
        </SafeAreaView>
    )
}