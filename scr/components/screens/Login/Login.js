import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errorMessage: ''
        }
    }

    login (email, password){
        if(email && password){
        auth.signInWithEmailAndPassword(email, password)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Tabnavigation')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                this.setState({ errorMessage: error.message });
                    console.error('Firebase authentication error:', error);
            }) 
        } else {
            this.setState({ errorMessage: 'Por favor, completa todos los campos.' });
            //this.props.navigation.navigate('TabNavigation')
        }

    }
    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.login}>Login</Text>
                {this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}  disabled={!this.state.email || !this.state.password} >
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        height: '100vh', // Ajusta la altura según sea necesario

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
        width: 300,
    },

    login:{
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
        textAlign: "center",
    }, 
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width:300,
    },
    textButton:{
        color: '#fff'
    }

    
})


export default Login;
