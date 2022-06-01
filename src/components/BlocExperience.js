import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-paper';
import { API_URL } from '@env';
import Bucket from './Bucket';
import Now from './Now';
import ModalMessage from './ModalMessage';
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';
import { authState } from "../store/auth/selectors";
import { useSelector } from "react-redux";

const BlocExperience = ({
  experience,
  user,
  navigation,
  hasActions = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [superliked, setSuperliked] = useState(false);
  const [interestId, setInterestId] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const { token, idUser } = useSelector(authState);

  useEffect(() => {
    experience?.interests && experience.interests.map(function (interest) { //set interest id and liked if it exists
      if (interest.user == `/api/users/${idUser}`) {
        if (interest.plan === 0 || interest.plan === false) {
          setLiked(true)
        }
        if (interest.plan === 1 || interest.plan === true) {
        setSuperliked(true)
      }
        setInterestId(interest.id)
      } else {console.log(interest.user, idUser)}
    })
  }, [])


  const handleLike = (experience) => {
    const bodyInterest = JSON.stringify({
      plan: false,
      title: experience.title,
      experience: `api/experiences/${experience.id}`,
    });

    liked
      ? (genericFetchWithToken(
          `${API_URL}/interests/${interestId}`,
          "DELETE",
          token
        ),
        console.log(
          `unliked ${experience.id} - interest ${interestId} deleted - by user ${idUser}`
        ),
        setLiked(false),
        setModalVisible(true),
        setModalType("unliked"),
        setTimeout(() => {
          setModalVisible(false);
        }, 1000))
      : experience.user.id != idUser //if not your own experience
      ? (genericFetchWithTokenBody(
          `${API_URL}/interests`,
          "POST",
          token,
          bodyInterest
        )
          .then((json) => json.json())
          .then((data) => {
            setInterestId(data.id),
              console.log(
                `liked ${experience.id} - interest ${data.id} created - by user ${idUser}`
              );
          })
          .catch((error) => console.error(error)),
        setLiked(true),
        setModalVisible(true),
        setModalType("liked"),
        setTimeout(() => {
          setModalVisible(false);
        }, 1000))
      : (console.log("Cannot like your own experiences"),
        setModalVisible(true),
        setModalType("error"),
        setTimeout(() => {
          setModalVisible(false);
        }, 2000));
  };
  const encodedBase64 = experience.image;

  const handleSuperLike = () => {
    setModalVisible(true),
        setModalType("unsuperlike"),
        setTimeout(() => {
          setModalVisible(false)
        }, 2000)
  }

  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.blocExperience}
        onPress={() => {
          navigation.navigate("Experience", { id: experience.id });
        }}
      >
        <Image
          style={styles.experiencePicture}
          source={
            { uri: encodedBase64 } ?? require(`../../assets/exemple_ville.jpeg`)
          }
        />
        <View style={styles.blocText}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{experience.title}</Text>
            <Text> | </Text>
            <Text style={{ fontStyle: "italic" }}>{experience.location}</Text>
          </Text>
          <Text numberOfLines={3}>{experience.content}</Text>
        </View>
      </TouchableOpacity>

      {/* Actions line display only with props hasActions */}
      {hasActions && (
        <View style={styles.blocActions}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User", { id: user.id });
            }}
          >
            <Avatar.Image
              style={styles.avatar}
              size={24}
              color="white"
              source={require("../../assets/profil.png")}
            />
          </TouchableOpacity>
          {!superliked && <TouchableOpacity onPress={() => { handleLike(experience) }} >
            <Bucket liked={liked} />
          </TouchableOpacity>}
          {superliked &&  <TouchableOpacity onPress={() => { handleSuperLike() }} >
        <Now liked={true} />
          </TouchableOpacity>}
        </View>
      )}
      {modalVisible && modalType && <ModalMessage modalType={modalType} />}
    </View>
  );
};

const styles = StyleSheet.create({
  experiencePicture: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: "white",
  },
  blocExperience: {
    flex: 1,
    flexDirection: "row",
  },
  box: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "grey",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
  },
  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-between",
  },
});

export default BlocExperience;
