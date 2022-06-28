import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, TextInput } from "react-native";

const PasswordModal = ({ handleSubmitButtonPassword, openPass, setOpenPass, userPassword, setUserPassword, user }) => {

  return (
    <Modal
    presentationStyle="overFullScreen"
    animationType="fade"
    transparent={true}
    visible={openPass}
  >
    <View style={styles.container}>
      <View style={styles.modalView}>
      <TouchableOpacity onPress={() => setOpenPass(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
              
                <View style={styles.text}>
                  <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                    Un nouveau mot de passe ?
                  </Text>
                  <TextInput
                    placeholder='Change ton mot de passe ici '
                    style={styles.input}
                    onChangeText={(userPassword) => setUserPassword(userPassword)}
                    keepDefaultValues={user.password}
                    numberOfLines={6}
                    secureTextEntry={true}
                    multiline
                    editable
                  />
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButtonPassword()}
                  >
                    <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.SectionStyle}>
          </View>
       
      </View>
    </View>
  </Modal>
  );
};

export default PasswordModal;

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
  },
});
