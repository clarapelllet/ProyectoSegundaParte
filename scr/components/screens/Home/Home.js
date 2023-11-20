import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Post from '../../component/post';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(12)
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
    }
    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Login')
    }
 
    render() {
        console.log(this.state);
        return (
            <ScrollView> 
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text style={styles.logout} >Logout</Text>
                </TouchableOpacity>

                <Text style={styles.listaposteos}>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />

                    
                
    </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    listaposteos: { 
        fontWeight: "bold",
        color: "blue",
        textAlign: "center",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    logout: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
        textAlign: "center",
        alignSelf: 'flex-start',
        marginLeft: 'auto',
    }

    })

export default Home;