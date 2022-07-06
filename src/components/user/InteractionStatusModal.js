import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';


const InteractionStatusModal = (interest, experience) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState();
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  });

  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "accepted": accepted
    })
    PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchUser();
    setOpenPhone(false)

};

return (
  <View>

    <Pressable
        style={styles.buttonOpen}
        onPress={() => setModalVisible(true)}
      >
      <Image style={{ width: 25, height: 25, marginTop:15}} source={require('../../../assets/attente.png')}  />
    </Pressable>



    <Modal
     presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
     


                


  <View style={styles.container}>
        <View style={styles.modalView}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  style={styles.close}
                  source={require(`../../../assets/icons/close.png`)}
                />
              </TouchableOpacity>
              <View style={styles.text}>
          <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
               Change la durée de ton expérience !
          </Text>
 
  { experience && ( 
          <Text key={experience.id}>
              <Text key={experience.title}></Text>

            

  <View style={styles.SectionStyle}>
       
  <SelectDropdown
data={[
  { status: "Accepter", data: 2 },
  { status: "Refuser", data: 1}

]}
onSelect={(selectedItem) => {
  setAccepted(selectedItem.data);
}}
defaultButtonText='Modifie le statut'
buttonTextAfterSelection={(selectedItem, index) => {
  return selectedItem.status;
}}
rowTextForSelection={(item, index) => item.status}
buttonStyle={styles.dropdown}
/>
  </View>

            <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => handleSubmitButton()}
                >
                  <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                </TouchableOpacity>

   </Text> )
  
  
    }
    </View>
</View>
        
        </View>

    </Modal>

  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: "rgba(0,0,0,0.7)",

},
modalView: {
  margin: 20,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 10,
  justifyContent: "center",
  alignContent: "center",
  elevation: 5,
  alignSelf: "center",
  textAlign: "center",
  backgroundColor: "white",
  
},
image: {
  padding: 20,
},
icon: {
  width: 72,
  height: 72,
  alignSelf: "center",
  marginBottom: 10,
},
text: {
  backgroundColor: "#f2f2f2",
  padding: 15,
  borderRadius: 10,
  flexDirection:'column'
  
},

buttonStyle: {
  backgroundColor: "#f14d53",
  height: 40,
  alignItems: "center",
  borderRadius: 30,
  justifyContent: "center",
  width: 100,
},

input: {
  marginBottom: 20,
  marginTop: 20
},

SectionStyle: {
flexDirection: "row",
marginLeft: 35,
marginRight: 35,
},
});

export default InteractionStatusModal;



