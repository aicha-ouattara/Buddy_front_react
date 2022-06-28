import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';

function ImageModal ({navigation, experience}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  const [image, setImage] = useState(null);
  const { token, idUser } = useSelector(authState);
  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "image": image
    })
    PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchExperience();    

};


const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
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
        animationType="fade"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          
        }}
      >
       <View style={styles.container}>
          <View style={styles.modalView}>
          
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
               

                    <View style={styles.text}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                                    Change ton image!
                                  </Text>
                    {
                        
        experience && ( 
            <Text key={experience.id}>
                <Text key={experience.title}></Text>
 <View style={styles.text}>
    <View style={styles.camera}>
        <Text style={styles.plus} onPress={pickImage}>
          &#65291;
        </Text>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
      </View>


      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
          }}
        />
      )}

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButtonLieu()}
                  >
                    <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                  </TouchableOpacity>
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
    },
  
    buttonStyle: {
      backgroundColor: "#f14d53",
      height: 40,
      alignItems: "center",
      borderRadius: 30,
      justifyContent: "center",
      marginTop: 20,
    },
  
    plus: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      backgroundColor: 0,
    },

    camera: {
      backgroundColor: "#f14d53",
      borderRadius: 10,
      paddingBottom: 10,
      paddingTop: 10,
      marginTop: 5,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
});

export default ImageModal;
