import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



const BlocExperience = ({experience, user, navigation}) => {
  // experience&&console.log(experience);

  
    return (
      <View style={styles.containerBlocExperience}>
        <Image source={require('../../assets/exemple_ville.jpeg')}/>
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>title = {experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text>

<<<<<<< Updated upstream
       </View>
      
=======
  const handleSuperLike = () => {
    setModalVisible(true),
      setModalType("unsuperlike"),
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
  };

  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.blocExperience}
        onPress={() => {
          navigation.navigate("Experience", {
            id: experience.id,
            name: experience.title,
          });
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
        <View
          style={[
            styles.blocActions,
            { justifyContent: !hasAvatar ? "center" : "space-between" },
          ]}
        >
          {hasAvatar && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User", { id: user.id, name: user.login });
              }}
            >
              <Avatar.Image
                style={styles.avatar}
                size={24}
                color="white"
                source={require("../../assets/profil.png")}
              />
            </TouchableOpacity>
          )}
          {!superliked && (
            <TouchableOpacity
              onPress={() => {
                handleLike(experience);
              }}
            >
              <Bucket liked={liked} />
            </TouchableOpacity>
          )}
          {superliked && (
            <TouchableOpacity
              onPress={() => {
                handleSuperLike();
              }}
            >
              <Now liked={true} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {modalVisible && modalType && <ModalMessage modalType={modalType} />}
    </View>
>>>>>>> Stashed changes
  );
}
  
const styles = StyleSheet.create({
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  box: {
    flexDirection: "row",
    marginTop: 20
  },

  blocText: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

});
    
export default BlocExperience;