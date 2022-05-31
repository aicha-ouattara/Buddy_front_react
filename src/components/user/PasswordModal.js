import React, { useReducer, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import PasswordUpdate from "./PasswordUpdate";


const PasswordModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>

{/* sur la page profil affichage */}
      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 20, height: 20 }} source={require('../../../assets/edit.png')}  />
      </Pressable>

  

      <Modal
        animationType="slide"
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
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/close.png')}  />
            </Pressable>

            <Text style={styles.modalText}>Modifier Login</Text>

           <PasswordUpdate/>
          
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
    width: "70vw",
    borderRadius: 20,
  },
  
  modalView: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   textAlign: "right",
  //   alignItems: "right",
  // },
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

export default PasswordModal;