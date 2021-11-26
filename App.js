import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} 
          options={{
             title: 'Danh sách học viên' ,
          }} />
        <Stack.Screen name="Detail" component={DetailScreen} 
          options={{ title: 'Chi tiết học viên' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

