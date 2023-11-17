import  { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../component/post';


class MiPerfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            posts: [],
            infoUser: {},
            
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

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render(){
        console.log(this.state);
        return(
            <ScrollView>
                <Text style={styles.screenTitle} >Profile</Text>
                <View style={styles.mainContainer}>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text style={styles.texto}>Logout</Text>
                </TouchableOpacity>
                  
                
                <Text style={styles.texto} >Mail: {auth.currentUser.email}</Text>
                <Text style={styles.texto}>Bio: {this.state.infoUser.biografia}</Text>

                </View>
                <Text style={styles.posteos}>My Posts</Text>
                   
                    <FlatList 
                        data= {this.state.posts}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post dataPost = { item } /> }
                        
                    />

                
            </ScrollView>
            
        )}
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10,
        color: "blue"

    },
    texto: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center'
    },
    posteos: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        height: '10vh', // Ajusta la altura según sea necesario
        color: "blue"


    },
    image: {
        alignSelf: 'center',
        height: 80,
        width: "20%",
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 100
    },
    mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 30,
        marginVertical: 5,
        width: 280,
        height: 100,
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        height: '100vh', // Ajusta la altura según sea necesario
    },
    

})
export default MiPerfil