import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const InteractionModal = ({ handleSubmitButton, open, setOpen, accepted, setAccepted, interest }) => {

  return (
    <Modal
    presentationStyle="overFullScreen"
    animationType="fade"
    transparent={true}
    visible={open}
  >
    <View style={styles.container}>
      <View style={styles.modalView}>
      <TouchableOpacity onPress={() => setOpen(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
              
                <View style={styles.text}>
                  <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                  Change ton login ici !
                  </Text>
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
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButton()}
                  >
                    <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                  </TouchableOpacity>
                </View>
       
      </View>
    </View>
  </Modal>
  );
};

export default InteractionModal;

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
