import { View, SafeAreaView, ScrollView } from "react-native";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export default function Garage() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Card className='rounded-none'>
                    <CardHeader>
                        <CardTitle>Garage</CardTitle>
                    </CardHeader>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}