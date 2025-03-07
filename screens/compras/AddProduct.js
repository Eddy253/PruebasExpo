import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from 'react';
import { ComprasStyles } from "../../styles/comprasStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddProduct({navigation}) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');

    const verifyProduct = async () => {
        if (!name || !quantity || !price || !category ) {
            Alert.alert('Error', 'Debe de llenar todos los campos.')
            window.alert("Debe de llenar todos los campos.");
            return;
        }
    }

    const saveProduct = async () => {
        try {
            const newProduct = {
                id,
                name,
                quantity,
                price,
                category,
                desc,
            };

            const storedProduct = await AsyncStorage.getItem('productos');
            const products = storedProduct ? JSON.parse(storedProduct) : [];

            products.push(newProduct);
            await AsyncStorage.setItem('productos', JSON.stringify(products));

            setTitulo('');
            setDescorta('');
            setFecha('');
            setDescripcion('');
            Alert.alert('Guardado', 'El producto se guardo exitosamente');
            window.alert("Tu nota se guardo exitosamente");
            navigation.navigate('ListaGlobal');
        } catch (error) {
            console.error('Error al guardar el producto: ', error);
            Alert.alert('Error', `No se pudo guardar el producto. Error: ${error.message || error}`);
            window.alert("No se pudo guardar la nota.");
        }        
    };

    const updateProduct = async () =>{

    }

    return(
        <ScrollView contentContainerStyle={ComprasStyles.scrollContainer}>
            <View style={ComprasStyles.main}>
                <Text style={ComprasStyles.title}>Agregar producto</Text>
                <View style={ComprasStyles.card} >
                    <TextInput 
                        placeholder='Nombre' 
                        placeholderTextColor="slategray" 
                        value={name} 
                        onChangeText={setName}
                        autoFocus={true}
                        style={ComprasStyles.input}/>
                    <TextInput 
                        placeholder='Cantidad' 
                        placeholderTextColor="slategray" 
                        value={quantity} 
                        onChangeText={setQuantity}
                        maxLength={4}
                        style={ComprasStyles.input}/>
                    <TextInput 
                        placeholder='Precio'
                        placeholderTextColor="slategray" 
                        value={price} 
                        onChangeText={setPrice}
                        style={ComprasStyles.input}/>
                    <TextInput 
                        placeholder='Categoria' 
                        placeholderTextColor="slategray" 
                        value={category} 
                        onChangeText={setCategory}
                        style={ComprasStyles.input}/>
                    <TextInput 
                        placeholder='Descripción' 
                        placeholderTextColor="slategray" 
                        value={desc} 
                        onChangeText={setDesc}
                        style={ComprasStyles.input}/>
                    <TouchableOpacity style={ComprasStyles.button} onPress={verifyProduct}>
                        <Text style={ComprasStyles.textButton} >Registrar producto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}