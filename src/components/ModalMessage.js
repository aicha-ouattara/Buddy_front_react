import React from 'react';
import { StyleSheet, Modal, Pressable, View, Text } from 'react-native';


const ModalMessage = ({ message, modalVisible }) => {
  
  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      {/* <Pressable onPress={() => setModalVisible(!modalVisible)}> */}
        <View style={styles.modalView}>
          <Text>{message}</Text>
        </View>
      {/* </Pressable> */}
    </Modal>)

}

export default ModalMessage

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',

  },

})