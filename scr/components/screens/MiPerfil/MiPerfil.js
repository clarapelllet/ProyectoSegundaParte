import  { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post';


class MiPerfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            infoUser: {},
            id: ''
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id: unPost.id,
                        datos: unPost.data()
                    })
                })

                this.setState({
                    posts: postsAMostrar
                })
            }
        )

        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    }))
            })
    }

    signOut() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }
    render(){
        console.log(this.state);
        return(
            <View>
                <Text>Bienvenido {this.state.infoUser.userName}</Text>
                <Text>Biografia: {this.state.infoUser.bio}</Text>
                <Text>Mail: {auth.currentUser.email}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarPerfil')}>
                    <Text>Editar mi perfil</Text>
                </TouchableOpacity>
                
                <Text>Mis posteos:</Text>

                <View>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} />}
                />
                </View>
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
export default MiPerfil