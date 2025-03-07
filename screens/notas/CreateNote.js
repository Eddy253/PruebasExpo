import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useState } from 'react';
import { createNoteStyles } from "../../styles/createNoteStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateNote({navigation}) {
    const [titulo, setTitulo] = useState('');
    const [descorta, setDescorta] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const saveNote = async () => {
        if (!titulo || !descorta || !fecha || !descripcion) {
            Alert.alert('Error', 'Debe de llenar todos los campos.')
            window.alert("Debe de llenar todos los campos.");
            return;
        }

        try {
            const newNote = {
                id: Date.now().toString(),
                titulo,
                descorta,
                fecha,
                descripcion,
            };

            const storedNotes = await AsyncStorage.getItem('notas');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];

            notes.push(newNote);
            await AsyncStorage.setItem('notas', JSON.stringify(notes));

            setTitulo('');
            setDescorta('');
            setFecha('');
            setDescripcion('');
            Alert.alert('Guardado', 'Tu nota se guardo exitosamente');
            window.alert("Tu nota se guardo exitosamente");
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al guardar la nota: ', error);
            Alert.alert('Error', `No se pudo guardar la nota. Error: ${error.message || error}`);
            window.alert("No se pudo guardar la nota.");
        }        
    };

    const showDatePickerHandler = ()=>{
        setShowDatePicker(true);
    }
    const onDateChange = (event, date) =>{
        setShowDatePicker(Platform.OS === 'ios');
        if (event.type !== 'dismissed' && date) {
            setSelectedDate(date);
            setFecha(date.toLocaleDateString('es-ES'));
        }
    };
    return(
        <ScrollView contentContainerStyle={createNoteStyles.scrollContainer}>
            <View style={createNoteStyles.main}>
                <Text style={createNoteStyles.title}>Crear nota</Text>
                <View style={createNoteStyles.card} >
                    <TextInput 
                        placeholder='Titulo' 
                        placeholderTextColor="slategray" 
                        value={titulo} 
                        onChangeText={setTitulo}
                        style={createNoteStyles.input}/>
                    <TextInput 
                        placeholder='Descripción corta' 
                        placeholderTextColor="slategray" 
                        value={descorta} 
                        onChangeText={setDescorta}
                        style={createNoteStyles.input}/>

                    <TouchableOpacity style={createNoteStyles.input} onPress={showDatePickerHandler}>
                        <TextInput
                            style={{marginTop:10}}
                            placeholder="Fecha"
                            placeholderTextColor="slategray" 
                            value={fecha}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {
                        showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                            />
                    )}

                    <TextInput 
                        placeholder='Descripción' 
                        placeholderTextColor="slategray" 
                        value={descripcion} 
                        onChangeText={setDescripcion}
                        style={createNoteStyles.input}/>
                    <TouchableOpacity style={createNoteStyles.button} onPress={saveNote}>
                        <Text style={createNoteStyles.textButton} >Registrar nota</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}