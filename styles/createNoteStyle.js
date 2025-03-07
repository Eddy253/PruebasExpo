import { StyleSheet } from "react-native";

export const createNoteStyles = StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        justifyContent:'center',
    },
    main:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:12,
    },
    title:{
        marginTop:9,
        marginBottom:8,
        textAlign:'center',
        fontSize:24,
        fontStyle:'italic',
        fontWeight:'600',
    },
    dogInfo:{
        fontSize:15,
        color: 'gray',
    },
    card:{
        width:'90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding:20,
        marginTop:8,
        alignItems:'center',
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowRadius:10,
        elevation:8,
    },
    image:{
        width:120,
        height:120,
        borderRadius:60,
        marginBottom:20,
    },
    input:{
        width: '100%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#D9D9D9',
        paddingHorizontal:15,
        marginVertical:10,
        color:'#000',
    },
    button:{
        width:'100%',
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        marginTop:20,
    },
    textButton:{
        color:'white',
        textAlign:'center',
        fontSize:18,
        fontWeight:'600',
    },
    text:{
        color:'gray',
        fontSize:16,
        fontWeight:'300',
        marginTop:15,
    }
})