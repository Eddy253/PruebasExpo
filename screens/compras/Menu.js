import { Text, View, TouchableOpacity } from "react-native";
import { homeStyles } from "../../styles/homeStyle";
import { Icon } from '@rneui/themed';

export default function Menu({navigation}){
    return(
            <View style={homeStyles.main} >
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', height: '30%'}}>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('NewList')}
                        style={homeStyles.buttonAdd}>
                        <Text style={homeStyles.textButtonAdd}>Nueva lista</Text>
                        <Icon name='bag-add-outline' type='ionicon' color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('')}
                        style={homeStyles.buttonAdd}>
                        <Text style={homeStyles.textButtonAdd}>Lista global</Text>
                        <Icon name='earth-outline' type='ionicon' color='white'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', height: '30%'}}>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('')}
                        style={homeStyles.buttonAdd}>
                        <Text style={homeStyles.textButtonAdd}>xd</Text>
                        <Icon name='add-outline' type='ionicon' color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('')}
                        style={homeStyles.buttonAdd}>
                        <Text style={homeStyles.textButtonAdd}>xd2</Text>
                        <Icon name='ellipsis-horizontal-outline' type='ionicon' color='white'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
}