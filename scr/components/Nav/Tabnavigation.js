import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../screens/Home/Home";
import PostForm from '../screens/PostForm/PostForm';
import MiPerfil from '../screens/MiPerfil/MiPerfil';

const Tab = createBottomTabNavigator();

export default function TabNav(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} /> 
            <Tab.Screen name="Crear Post" component={PostForm}/>
            <Tab.Screen name="Mi Perfil" component={MiPerfil}/>
        </Tab.Navigator>
    )
}