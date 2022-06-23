import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';
import AvatarChoice from './AvatarChoice';

function AvatarModal ({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const { token, idUser } = useSelector(authState);



  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchUser();
  }, [])

  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "avatar": avatar
    })
    PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchUser();
    console.log('ok')

console.log('hh')
    

};



  return (
    <View>
      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 15, height: 15, marginLeft: 10 }} source={require('../../../assets/edit.png')}  />
      </Pressable>

  

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.closeButton}>
            <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                     <Image
                      style={styles.close}
                      source={require(`../../../assets/icons/close.png`)}
                    />
            </Pressable>
            </View>

            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>Modifier votre avatar </Text>

                  

    <View style={styles.container}>
   
    {
        
        user && ( 
            <Text key={user.id}>
             

    <View style={styles.camera}>
   
            <AvatarChoice/>

      </View>
     
   

  
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
  experiencePicture: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: "cover",
  },

  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
    fontWeight: "bold",
  },

  avatar: {
    backgroundColor: "white",
  },

  blocActions: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    flexDirection: "row",
    alignItems: "center",
  },

  views: {
    padding: 10,
    flex: 0.5,
    justifyContent: "space-around",
  },

  container: {
    flex: 0.7,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingTop: 20,

  },

  modalView: {
    margin: 20,
   
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
  close: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    margin: 5,
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
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },


});

export default AvatarModal;
