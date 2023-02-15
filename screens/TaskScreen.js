import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, FlatList, StyleSheet, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { IconButton, Colors } from 'react-native-paper';
import db from '../database/Firebase';


const TaskScreen =  (props) =>{

const [task, setTask] = useState([]);
const [refreshing, setRefreshing] = useState(false);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);



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

Alert.alert("Eliminar Medicamento", "¿Estas seguro que quieres eliminar este medicamento?", [

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


if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }


const renderItem = ({item}) =>{
  return(
  <View style={styles.container}>
    <TextInput
          style={styles.searchInput}
          placeholder="Buscar Medicamento"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
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

  return(
        <ScrollView>
          <View>
            <Button 
                   title="Agregar Medicamentos"
                   onPress={() => props.navigation.navigate("Agregar")}
                  
            />
          </View>
             <FlatList 
              data={task.filter(
                  (task) =>
                  task.catidad.toLowerCase().includes(search) ||
                  task.lote.toLowerCase().includes(search) ||
                  task.medicamento.toLowerCase().includes(search) ||
                  task.ubicacion.toLowerCase().includes(search) ||
                  task.vencimiento.toLowerCase().includes(search)
                )}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={async () => {
              setRefreshing(true);
              await getData();
              setRefreshing(false);
             }}
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

 loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

titletask:{

marginTop: 10,

},

searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
    alignItems: "center",
  },


})


export default TaskScreen;