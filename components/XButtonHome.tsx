import { TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function XButtonHome() {
    const navigation = useNavigation();
    const { isDarkColorScheme } = useColorScheme();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
        >
            <X
                size={24}
                color={isDarkColorScheme ? '#fff' : '#000'}
                
            />
        </TouchableOpacity>
    )
}