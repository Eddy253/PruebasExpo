import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { homeStyles } from "../../styles/homeStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function NewList({navigation}){
    const [product, setProduct] = useState([])

    const loadProducts = async()=>{
        try {
            const storedProducts = await AsyncStorage.getItem('productos')
            const parsedProducts = storedProducts ? JSON.parse(storedProducts) : []
            setProduct(parsedProducts)
        } catch (error) {
            console.log('error al cargar los productos', error);
        }
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', loadProducts)
        return unsubscribe
    }, [navigation])

    const renderProduct = ({item}) =>(
        <TouchableOpacity style={homeStyles.noteCard} onPress={()=>navigation.navigate('DetailNote', {product:item})}>
            <View>
                <Text style={homeStyles.noteTitle}>{item.titulo}</Text>
                <Text style={homeStyles.noteDate}>{item.fecha}</Text>
                <Text style={homeStyles.noteShortDesc}>{item.descorta}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <View style={homeStyles.main} >
            <Text style={homeStyles.title}>Nueva lista</Text>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('AddProduct')}
                style={homeStyles.buttonAdd}>
                <Text style={homeStyles.textButtonAdd}>Agregar producto</Text>
            </TouchableOpacity>
            <FlatList
                data={product}
                keyExtractor={(item)=>item.id}
                renderItem={renderProduct}
                contentContainerStyle={homeStyles.listContainer}
                ListEmptyComponent={() => <Text style={{textAlign:'center'}}No hay productos registrados></Text>}
            />
        </View>
    )
}