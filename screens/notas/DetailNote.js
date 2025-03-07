import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert, Modal, Button, Platform} from "react-native";
import { detailnoteStyle } from "../../styles/detailNoteStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/themed';

export function DetailNote(){
    const route = useRoute()
    const navigation = useNavigation()
    const { note } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const deleteNote = async () => {
        if (Platform.OS === 'web') {
            setModalVisible(true);
        } else {
            Alert.alert(
                'IMPORTANTE',
                '¿Estás seguro de que deseas elininar esta nota?',
                [
                    {
                        text: 'Cancelar',
                        style:'cancel',
                    },
                    {
                        text:'OK',
                        onPress: async()=>{
                            try {
                                const storedNotes = await AsyncStorage.getItem('notas');
                                const notes = storedNotes ? JSON.parse(storedNotes) : [];
    
                                const updateNotes = notes.filter(n => n.id !== note.id);
    
                                await AsyncStorage.setItem('notas', JSON.stringify(updateNotes));
    
                                Alert.alert('Nota eliminada', 'La nota ha sido eliminada con éxito.');
                                navigation.navigate('Home');
                            } catch (error) {
                                console.log('Error al eliminar la nota: ', error);
                                Alert.alert('Error', 'No se puedo eliminar la nota.');
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notas');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];

            const updatedNotes = notes.filter(n => n.id !== note.id);

            await AsyncStorage.setItem('notas', JSON.stringify(updatedNotes));

            Alert.alert('Nota eliminada', 'La nota ha sido eliminada con éxito.');
            setModalVisible(false); // Cerramos el modal en la web
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error al eliminar la nota: ', error);
            Alert.alert('Error', 'No se pudo eliminar la nota.');
        }
    };

    return(
        <ScrollView contentContainerStyle={detailnoteStyle.scrollContainer}>
            <View style={detailnoteStyle.card}>
                <Text style={detailnoteStyle.title}>NOTA</Text>
                <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                    <Text style={detailnoteStyle.titulo}>{note.titulo}</Text>
                    <TouchableOpacity style={{marginTop:25}} onPress={deleteNote}>
                        <Icon name='trash' type='ionicon' color='red'/>
                    </TouchableOpacity>
                </View>
                <Text style={detailnoteStyle.fecha}>{note.fecha}</Text>
                <Text style={detailnoteStyle.descripcion}>{note.descripcion}</Text>
            </View>

            {/* Modal para la web */}
            {Platform.OS === 'web' && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                            <Text>¿Estás seguro de que deseas eliminar esta nota?</Text>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="OK" onPress={handleConfirmDelete} />
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    )
}

export default DetailNote