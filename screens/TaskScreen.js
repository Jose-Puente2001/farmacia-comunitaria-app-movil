import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, FlatList, StyleSheet, Alert, RefreshControl } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { IconButton, Colors } from 'react-native-paper';
import db from '../database/Firebase';


const TaskScreen =  (props) =>{

const [task, setTask] = useState([]);
const [refreshing, setRefreshing] = useState(false);


const getData = async () => {
const querySnapshot = await getDocs(collection(db, 'medicamentos'));
const task = [];
querySnapshot.forEach((doc)=>{
  
  const { cantidad, lote, medicamento, ubicacion, vencimiento } = doc.data();
    task.push({

        id: doc.id,
        cantidad,
        lote,
        medicamento,
        ubicacion,
        vencimiento,

    });
   setTask(task)
});    
}

const onDeleteTask = (id) => {

Alert.alert("Eliminar Medicamento", "Medicamento Eliminado", [

{
 
 text: "Cancel",
 style: "cancel",

},
{

text: "OK",
onPress: async () => {
  
await deleteDoc(doc(db, 'medicamentos', id));
await getData();

}
}
])
}


useEffect(() => {
  
getData();

}, []);


const renderItem = ({item}) =>{
  return(
  <View style={styles.container}>
    <Text style={styles.titletask}>{item.cantidad}</Text>
    <Text style={styles.titletask}>{item.lote}</Text>
    <Text style={styles.titletask}>{item.medicamento}</Text>
    <Text style={styles.titletask}>{item.ubicacion}</Text>
    <Text style={styles.titletask}>{item.vencimiento}</Text>
    <IconButton
      icon="trash-can"
      color={Colors.red500}
      size={20}
      onPress={() => onDeleteTask(item.id)}
    />
   </View>   
  )
}


const onRefresh = React.useCallback (async() => {
  
  setRefreshing(true);
  await getData();
  setRefreshing(false);

}, []);

  return(
        <ScrollView>
          <View>
            <Button 
                   title="Agregar Medicamentos"
                   onPress={() => props.navigation.navigate("Agregar")}
                  
            />
          </View>
             <FlatList 
              data={task}
              renderItem={renderItem}
              refreshcontrol={
                <RefreshControl
                  colors={["#51d1f6"]}
                  onRefresh={onRefresh}
                  refreshing={refreshing}

                />
              }
           />
        </ScrollView>

  )
}

const styles = StyleSheet.create({

container: {

padding: 20,
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",

},


titletask:{

marginTop: 10,

}


})


export default TaskScreen;