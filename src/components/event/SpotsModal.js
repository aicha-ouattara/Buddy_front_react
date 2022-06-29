import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import NumberPlease from "react-native-number-please";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';
import SelectDropdown from "react-native-select-dropdown";

function SpotsModal ({navigation, experience}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  const [spots, setSpots] = useState({ id: "spots", value: 0 });
  const { token, idUser } = useSelector(authState);
  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "spots": spots
    })
    PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchExperience();
  
};

  return (
    <View>

{/* sur la page profil affichage */}
      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 10, height: 10 }} source={require('../../../assets/edit.png')}  />
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
                 Changer le nombre de place(s)
            </Text>
    {
        
        experience && ( 
            <Text key={experience.id}>
                <Text key={experience.title}></Text>

                <View style={styles.SectionStyle}>
          <SelectDropdown
          style={styles.input}
                  data={[
                    { hours: "1 place ", data: 1 },
                    { hours: "2 places", data: 2 },
                    { hours: "3 places", data: 3 },
                    { hours: "4 places", data: 4 },
                    { hours: "5 places", data: 5 },
                    { hours: "6 places", data: 6 },
                    { hours: "7 places", data: 7 },
                    { hours: "8 places", data: 8 },
                    { hours: "9 places", data: 9 },
                    { hours: "10 places", data: 10 },
                    { hours: "11 places", data: 11 },
                    { hours: "12 places", data: 12 },
                    { hours: "13 places", data: 12 },
                    { hours: "14 places", data: 12 },
                    { hours: "15 places", data: 12 },
                  ]}
                  onSelect={(selectedItem) => {
                    setSpots(selectedItem.data);
                  }}
                  // value={selectedItem.data}
                  defaultButtonText={"Nombres de places"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.data;
                  }}
                  rowTextForSelection={(item, index) => item.hours}
                  buttonStyle={styles.dropdownNumber}
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

export default SpotsModal;
