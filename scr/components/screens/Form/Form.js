import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import Camara from '../../component/camara/camara';

class Form extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           showCamara: true,
           url: ""
        }
    }


    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            createdAt: createdAt, //Date.now(), 
            likes: [], 
            comentarios: [], 
            photo: this.state.url,
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }
    onImageUpload(url){
        this.setState({
            url: url,
            showCamara: false,
        })
    }


    render(){
        return(
            <View style={styles.formContainer}>
                {
              this.state.showCamara ?
              <Camara onImageUpload = {(url)=> this.onImageUpload(url)} />
              :
                <View>
                    
                <Text style={styles.texto}>Nuevo Posteo</Text>
                
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Texto del posteo...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
                </View>
                 }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        height: '40vh', 
    },
    texto:{
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center'
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    textButton:{
        color: '#fff'
    }

})


export default Form;