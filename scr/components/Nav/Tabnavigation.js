import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';


const Tab = createBottomTabNavigator();

import Home from '../screens/Home/Home';
import Form from '../screens/Form/Form';
import MiPerfil from '../screens/MiPerfil/MiPerfil';
import Buscador from '../screens/Buscador/Buscador';

export default function TabNav(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} /> 
            <Tab.Screen name="Crear Post" component={Form}/>
            <Tab.Screen name="Mi Perfil" component={MiPerfil}/>
            <Tab.Screen name="Buscador" component={Buscador} />
        </Tab.Navigator>
    )
}