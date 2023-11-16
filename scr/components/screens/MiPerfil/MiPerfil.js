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
                <Text >Profile</Text>
                <View>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                  
                
                <Text>Mail: {auth.currentUser.email}</Text>
                <Text>Bio: {this.state.infoUser.biografia}</Text>

                </View>
                <Text >My Posts</Text>
                   
                    <FlatList 
                        data= {this.state.posts}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post dataPost = { item } /> }
                        
                    />

                
            </ScrollView>
            
        )}
}
export default MiPerfil