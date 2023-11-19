import  { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../component/post';

class Usersprofile extends Component{
    constructor(props){
        super(props)
        this.state={
            Mailu: this.props.route.params.Mailu,
            Infou: {},
            Postsu: []   
        }
    }

    componentDidMount(){
        console.log(this.props.route.params)
        let perfil = this.state.Mailu
        db.collection('posts')
        .where ('owner', '==', perfil)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                Postsu: posts
            })
        })
        db.collection('users')
            .where ('owner', '==', this.state.Mailu)
            .onSnapshot (doc => {
                doc.forEach(doc =>
                    this.setState ({
                        id: doc.id,
                        Infou: doc.data()
                }))
            })

    }


    render(){
        return(
            <View> 
                <Text>{this.state.Infou.userName}</Text>
                <Text>{this.props.route.params}</Text>
                <Text>{this.state.Infou.bio}</Text>
                <Text>{this.state.Postsu.length}</Text>
                {/* <Image
                source = {{uri: this.state.Infou.profileImage}} /> 
                 */}
                <FlatList
                data= {this.state.Postsu}
                keyExtractor={item => item.id} 
                renderItem = {({item}) => <Post dataPost={item.datos} navigation={this.props.navigation} />}
                />

            </View> 

        )
    }
}
export default Usersprofile;