import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { homeStyles } from "../../styles/homeStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function Notes({navigation}){
    const [notes, setNotes] = useState([])

    const loadNotes = async()=>{
        try {
            const storedNotes = await AsyncStorage.getItem('notas')
            const parsedNotes = storedNotes ? JSON.parse(storedNotes) : []
            setNotes(parsedNotes)
        } catch (error) {
            console.log('error al cargar notas', error);
        }
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', loadNotes)
        return unsubscribe
    }, [navigation])

    const renderNote = ({item}) =>(
        <TouchableOpacity style={homeStyles.noteCard} onPress={()=>navigation.navigate('DetailNote', {note:item})}>
            <View>
                <Text style={homeStyles.noteTitle}>{item.titulo}</Text>
                <Text style={homeStyles.noteDate}>{item.fecha}</Text>
                <Text style={homeStyles.noteShortDesc}>{item.descorta}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <View style={homeStyles.main} >
            <Text style={homeStyles.title}>Mis notas</Text>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('CreateNote')}
                style={homeStyles.buttonAdd}>
                <Text style={homeStyles.textButtonAdd}>Agregar nota</Text>
            </TouchableOpacity>
            <FlatList
                data={notes}
                keyExtractor={(item)=>item.id}
                renderItem={renderNote}
                contentContainerStyle={homeStyles.listContainer}
                ListEmptyComponent={() => <Text style={{textAlign:'center'}}No hay notas registradas></Text>}
            />
        </View>
    )
}