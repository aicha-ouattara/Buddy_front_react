import React, { useReducer, useState, useEffect } from "react";
import { KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView, Alert, Modal, Text, Pressable, View, Image, StyleSheet, TextInput } from "react-native";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import Loading from "../../components/Loading";
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';



function LoginModal(){
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(0);
  const { token, idUser } = useSelector(authState);
  const [userLogin, setUserLogin] = useState("");
  const [errortext, setErrortext] = useState("");

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [])

const handleSubmitButton = () => {
        
        const body = JSON.stringify({
            "login": userLogin
        })
 
        PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body)
        .then(json => { console.log(json); } ) 
        .catch((error) => {console.error("error" , error)})
        fetchUser();
        console.log('ok')
  

    console.log('hh')

}
  return (
    <View>

{/* sur la page profil affichage */}
      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 15, height: 15, marginLeft: 10 }} source={require('../../../assets/edit.png')}  />
      </Pressable>

  

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              
            <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                     <Image
                      style={styles.close}
                      source={require(`../../../assets/icons/close.png`)}
                    />
            </Pressable>

            <Text style={styles.modalText}>Modifier Login</Text>

            <View style={styles.container}>
   
   return isLoading ? (
    <View style={{ padding: 10 }}>
      <Loading />
    </View>
  ) : (
      <View>
        
        user && ( 
            <Text key={user.id}>

        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            }}>
    <KeyboardAvoidingView enabled>

    <View style={styles.SectionStyle}>
         
        <TextInput
            style={styles.inputStyle}
            onChangeText={(UserLogin) => setUserLogin(UserLogin)}
            underlineColorAndroid="#f000"
            placeholder={user.login}
            placeholderTextColor="black"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
        />
    </View>
  
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>MODIFIER</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
     </Text> )
    
     </View>
      )
</View>
          
          </View>
        </View>
      </Modal>
  
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   
    borderRadius: 20,
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
  
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  close: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    margin: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default LoginModal;