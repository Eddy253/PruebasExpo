import { Text, View, TouchableOpacity } from "react-native";
import { homeStyles } from "../../styles/homeStyle";

export default function MenuConta({navigation}){
    return(
            <View style={homeStyles.main} >
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('')}
                    style={homeStyles.buttonAdd}>
                    <Text style={homeStyles.textButtonAdd}>xd</Text>
                </TouchableOpacity>
            </View>
        )
}