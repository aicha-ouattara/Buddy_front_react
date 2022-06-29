import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, TextInput } from "react-native";

const TitleModal = ({ handleSubmitButtonTitle, openTitle, setOpenTitle, title, setTitle, experience }) => {

  return (
    <Modal
    presentationStyle="overFullScreen"
    animationType="fade"
    transparent={true}
    visible={openTitle}
  >
    <View style={styles.container}>
      <View style={styles.modalView}>
      <TouchableOpacity onPress={() => setOpenTitle(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
              
                <View style={styles.text}>
                  <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                  Écris un nouveau titre
                  </Text>
                  <TextInput
                    placeholder={experience.title}
                    style={styles.input}
                    onChangeText={(title) => setTitle(title)}
                    keepDefaultValues={experience.title}
                    numberOfLines={6}
                    multiline
                    editable
                  />
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButtonTitle()}
                  >
                    <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                  </TouchableOpacity>
                </View>
       
      </View>
    </View>
  </Modal>
  );
};

export default TitleModal;

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

  input: {
    marginBottom: 20,
    marginTop: 20
},
});
