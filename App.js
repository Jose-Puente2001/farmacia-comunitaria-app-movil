import React from 'react';
import { StyleSheet,  StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from './screens/TaskScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

const Stack = createNativeStackNavigator();

function MyStack(){
  return(
     <StatusBar backgroundColor="#141414" />
       <Stack.Navigator>
        <Stack.Screen name="Farmacia Comunitaria" component={TaskScreen} />
        <Stack.Screen name="Agregar Medicamentos" component={CreateTaskScreen} />
      </Stack.Navigator>
    )
}

export default function App() {

 return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
