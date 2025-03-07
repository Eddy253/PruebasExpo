import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { homeStyles } from "../styles/homeStyle";

export default function Home({navigation}){

    return(
        <View style={homeStyles.main} >
            <Text style={homeStyles.title}>Inicio</Text>
        </View>
    )
}