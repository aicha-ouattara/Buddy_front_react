import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Image } from 'react-native';

const ModalMessage = ({ modalType = '', modalVisible }) => {

  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')


  const selectType = () => {
    switch (modalType) {
      case "error":
        setImageUrl("lost-compass.gif")
        setTitle("OOPS !")
        setText("Tu essayes d'ajouter une de tes propres expériences à ta bucket list...")
        break;
      case "missing":
        setImageUrl("lost-compass.gif")
        setTitle("OOPS !")
        setText("Tous les champs sont obligatoires.")
        break;
      case "stop":
        setImageUrl("icons/stop.gif")
        setTitle("OOPS !")
        setText("Tu ne peux pas liker une expérience dans ta to do now.")
        break;
        case "superliked":
        setImageUrl("icons/todonow.gif")
        setTitle("YAY !")
        setText("Expérience ajoutée à ta to do now !")
        break;
      case "unsuperlike":
        setImageUrl("icons/stop.gif")
        setTitle("OOPS !")
        setText("Cette expérience est déjà dans ta To Do Now. Tu ne peux pas la supprimer si facilement.")
        break;
      case "liked":
        setImageUrl("liked.gif")
        setTitle("YAY !")
        setText("Expérience ajoutée à ta bucket list !")
        break;
      case "unliked":
        setImageUrl("unliked.gif")
        setTitle("OH ...")
        setText("Expérience supprimée de ta bucket list.")
        break;
    }
  }

  useEffect(() => {
    selectType()
  }, [])

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.image}>
            {imageUrl && <Image style={styles.icon} source={require(`../../assets/${imageUrl}`)} />}
          </View>
          <View style={styles.text}>
            <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>{title}</Text>
            <Text>{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  )

}

export default ModalMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    margin: 20,
    width: "70vw",
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    elevation: 5,
    justifySelf: "center",
    alignSelf: 'center',
    textAlign: "center",
    backgroundColor: "white",

  },
  image: {
    padding: 20
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
  }
})