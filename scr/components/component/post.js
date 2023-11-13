import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'

class Post extends Component {

    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
            // cantidadDeComentarios: this.props.dataPost.datos.comentarios.length
        }
    }

    componentDidMount(){
        //Chequear apenas carga si el post está o no likeado
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like:true
            })
        }
        
    }

    //Necesitamos en FB que cada Post tenga una propiedad con un array de emails

    likear(){
        //Agrega un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }

    unlike(){
        //Quita un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }



render() {
    console.log(this.props)
    return (
        <View>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Navigation',
                    {
                        screen: 'Perfil',
                        params:{email:this.props.data.owner}})}> 
                        
            <Text>{this.props.dataPost.datos.owner}</Text>

            </TouchableOpacity> */} 
            {/* hacer perfil y descomentar */}

            {/* Agrega la foto del usuario */}
            <Text>{this.props.dataPost.datos.textoPost}</Text>
            <Text>Cantidad de Likes: {this.state.cantidadDeLikes}</Text>
            {/* <Text onPress={() => this.redirectToComments()}>Cantidad de Comentarios: {this.state.cantidadDeComentarios}</Text> */}
            {
                this.state.like ?
                    <TouchableOpacity style={styles.button} onPress={() => this.unlike()}>
                        <AntDesign name='heart' color='red' size={20} />
                        <Text style={styles.textButton}>unLike</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                        <Text style={styles.textButton}>Likear</Text>
                        <AntDesign
                           name='heart-o' color='black' size={20}
                        />
                    </TouchableOpacity>

            };
        </View>
    )}

        }

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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
        backgroundColor:'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'orange'
    },
    textButton:{
        color: '#fff'
    },
    likeContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
    likeText: {
            marginLeft: 5
        }
    });


export default Post;