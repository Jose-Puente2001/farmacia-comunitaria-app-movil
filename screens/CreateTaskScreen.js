import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import db from '../database/Firebase';
import { collection, addDoc } from 'firebase/firestore';


const CreateTaskScreen = (props) => {

const [state, setState] = useState({

  cantidad: "",
  lote: "",
  medicamento: "",
  ubicacion: "",
  vencimiento: "",
  

});


const handleChangeText = (name, value) =>{

   setState({ ...state, [name]: value });
}


const addTask = async () =>{
  if(state.name === ""){
        Alert.alert(
        "Debes agregar un medicamento", 
        "No se puede enviar datos vacio",
        [
          
          {text: 'OK'},

        ],
     );
  }

  else{

  try {

       const docRef = await addDoc(collection(db, "medicamentos"), {
            cantidad: state.cantidad,
            lote: state.lote,
            medicamento: state.medicamento,
            ubicacion: state.ubicacion,
            vencimiento: state.vencimiento,
            
        });
        
        props.navigation.navigate("Medicamento");
     }

     catch (e) {
       console.error("Error adding document: ", e)
  }

   }
}


  return(
  <ScrollView style={styles.container}>
      <View style={styles.input}>
        <TextInput 
        placeholder="Cantidad" 
        onChangeText={(value) => handleChangeText("cantidad", value)} />
      </View>
      <View style={styles.input}>
        <TextInput 
        placeholder="Lote" 
        onChangeText={(value) => handleChangeText("lote", value)} />
      </View>
      <View style={styles.input}>
        <TextInput 
        placeholder="Medicamento" 
        onChangeText={(value) => handleChangeText("medicamento", value)} />
      </View>
      <View style={styles.input}>
        <TextInput 
        placeholder="Ubicacion" 
        onChangeText={(value) => handleChangeText("ubicacion", value)} />
      </View>
      <View style={styles.input}>
        <TextInput 
        placeholder="Vencimiento" 
        onChangeText={(value) => handleChangeText("vencimiento", value)} />
      </View>
      <View style={styles.input}>
        <Button title="Agregar" onPress={() => addTask()}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

container:{

flex: 1,
padding: 35,

},

input: {

 flex: 1,
 marginBottom: 15,
},

});




export default CreateTaskScreen;

