import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocExperience = ({review, navigation}) => {

<<<<<<< Updated upstream
    return (
      <View  style={styles.box}>
       { console.log(review)}
         <Text>id = {review.id}</Text>
         <Text>message = {review.message}</Text>
         <Text>rating = {review.rating}</Text>
         {/* <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text> */}
       </View>
=======
  useEffect(() => {
    setIsLoading(true);
    const userId = review?.user.replace("/api/users/", "");
    fetchUser(userId);
  }, [review]);

  return isLoading ? (
    <View style={{ padding: 10 }}>
      <Loading />
    </View>
  ) : (
    <View style={styles.box}>
      <View style={styles.blocReview}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("User", { id: user.id, name: user.login });
          }}
        >
          <Avatar.Image
            size={50}
            color="white"
            source={require("../../assets/profil.png")}
          />
        </TouchableOpacity>
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User", { id: user.id, name: user.login });
            }}
          >
            <Text style={styles.link}>{user.login}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {Array(review?.rating).fill(
              <Image
                style={{ height: 24, width: 24 }}
                source={require(`../../assets/icons/star-filled.png`)}
              />
            )}
          </View>
          <Text style={{ paddingTop: 5 }}>{review.message}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        {new Date(review.date).toLocaleDateString() ===
        new Date().toLocaleDateString() ? (
          <Text style={{ color: "grey" }}>
            à{" "}
            {new Date(review.date).toLocaleTimeString("fr-FR", {
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        ) : (
          <Text style={{ color: "grey" }}>
            le {new Date(review.date).toLocaleDateString()}
          </Text>
        )}
        {experience?.title ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Experience", {
                id: experience.id,
                name: experience.title,
              });
            }}
          >
            <Image
              style={styles.experiencePicture}
              source={require(`../../assets/exemple_ville.jpeg`)}
            />
            <Text style={{ fontWeight: "bold", color: "grey" }}>
              {experience.title}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: "grey" }}>expérience supprimée</Text>
        )}
      </View>
    </View>
>>>>>>> Stashed changes
  );
}
  
const styles = StyleSheet.create({

 

  box: {

   borderColor: "black",

    borderWidth: 1,

  },

});
    
export default BlocExperience;