import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            pImage: '',
            biografia: '',
            errorMessage: '',
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        
        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario al login del sitio.
                this.props.navigation.navigate('Login')
            }

        } )

    }
    register(email,password,userName,biografia,pImage){
    
        if (email && password && userName) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection('users').add({
                        owner: auth.currentUser.email,
                        userName: userName,
                        biografia: biografia || '',
                        pImage: pImage || '',
                        createdAt: Date.now(),
                    })
                    this.props.navigation.navigate("Login")
                   
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message });
                    console.error('Firebase authentication error:', error);
                });
        } else {
            this.setState({ errorMessage: 'Todos los campos obligatorios deben completarse.' });
        }
    };

    render() {
        return (
            <View style={styles.formContainer}>
                <Text>Registro</Text>
                {this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ userName: text })}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ bio: text })}
                    placeholder='Mini Bio (opcional)'
                    keyboardType='default'
                    value={this.state.bio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ profileImage: text })}
                    placeholder='URL de la foto de perfil (opcional)'
                    keyboardType='default'
                    value={this.state.profileImage}
                />
                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email,this.state.password,this.state.userName, this.state.bio, this.state.profileImage)}disabled={!this.state.email || !this.state.password || !this.state.userName}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>¿Ya tienes una cuenta? Ir al login</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})

export default Register;