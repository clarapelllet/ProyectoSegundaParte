import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login';
import Register from '../screens/register';
import Tabnavigation from './Tabnavigation';

const Stack = createNativeStackNavigator();

function Navigation() {
return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options= {{ headerShown : false}}/>
        <Stack.Screen name='Tabnavigation' component={Tabnavigation} options= {{ headerShown : false}}/>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
 )}
 export default Navigation;