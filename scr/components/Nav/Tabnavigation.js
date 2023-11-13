import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';


const Tab = createBottomTabNavigator();

import Home from '../screens/Home/Home';

export default function TabNav(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} /> 
            <Tab.Screen name="Crear Post" component={Form}/>
        </Tab.Navigator>
    )
}