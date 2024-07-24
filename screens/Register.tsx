import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { SafeAreaView, ScrollView, View } from 'react-native';



export default function Register({ navigation }: any) {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className='p-3'>
                    <Progress value={33} className='mt-10 mb-10' />
                </View>

                <Button onPress={() => navigation.navigate('Auth')}>
                    <Text>Go to home</Text>
                </Button>
                
            </ScrollView>
        </SafeAreaView>
    );
}