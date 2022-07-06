import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';

function DureeModal ({navigation, experience, fetchExperience}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  const [duration, setDuration] = useState();
  const { token, idUser } = useSelector(authState);

  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "duration": duration
    })
    PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchExperience();
    console.log('ok')


console.log('hh')
    

};

  return (
    <View>

      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 10, height: 10}} source={require('../../../assets/edit.png')}  />
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
                { hours: "< 1", data: 1 },
                { hours: "1-2 heures", data: 1.5 },
                { hours: "demie journée", data: 12 },
                { hours: "journée", data: 24 },
              ]}
              onSelect={(selectedItem) => {
                setDuration(selectedItem.data);
              }}
              defaultButtonText={experience.duration}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.data;
              }}
              rowTextForSelection={(item, index) => item.hours}
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

export default DureeModal;
