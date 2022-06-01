import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import BlocExperience from "../components/BlocExperience";
import BlocReview from "../components/BlocReview";
import Loading from "../components/Loading";
import { API_URL } from "@env";
import { genericFetchWithToken } from "../api/fetchApiWithToken";
import { authState } from "../store/auth/selectors";
import { useSelector } from "react-redux";
import { Divider } from "react-native-paper";

function UserScreen({ navigation, route }) {
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [reviews, setReviews] = useState({length: 0, average: 0});

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${route.params.id}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
    setIsMe(route.params.id === idUser);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [token]);

  useEffect(() => {
    const reviews = user?.experiences
      ? user?.experiences.flatMap((experience) =>
          experience.reviews.map((review) => review.rating)
        )
      : [];

    const average = (reviews.reduce((a, b) => a + b, 0) / reviews.length).toFixed(2);
    setReviews({length: reviews.length, average: average});
  }, [user?.experiences]);

  return isLoading ? (
    <Loading />
  ) : (
    <Tabs style={{ backgroundColor: "white", elevation: 0 }}>
      <TabScreen label="Expériences">
        <AllUserExperiences user={user} navigation={navigation} />
      </TabScreen>

      <TabScreen label="Avis">
        <AllUserReviews user={user} navigation={navigation} />
      </TabScreen>

      <TabScreen label="Profil">
        <UserProfileInfos
          user={user}
          reviews={reviews}
          isMe={isMe}
          navigation={navigation}
        />
      </TabScreen>
    </Tabs>
  );
}

function AllUserExperiences({ navigation, user }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) => (
              <BlocExperience
                hasAvatar={false}
                navigation={navigation}
                key={experience.id}
                experience={experience}
                user={user}
                hasActions={true}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

function AllUserReviews({ navigation, user }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.reviews.map((review) => (
                <BlocReview
                  navigation={navigation}
                  key={review.id}
                  review={review}
                  experience={experience}
                />
              ))
            )}
        </View>
      </ScrollView>
    </View>
  );
}

function UserProfileInfos({ user, reviews, isMe, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text style={styles.title}>Bonjour, je m'appelle {user.login} </Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/profil.png")}
        />
      </View>
      <View style={styles.profil}>
        <Text style={{ color: "grey" }}>
          Membre depuis{" "}
          {new Date(user.created_at).toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        {isMe && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text style={styles.button}>Modifier le profil</Text>
          </TouchableOpacity>
        )}
        <Text>{reviews.length} avis</Text>
        <Text>{reviews.average} étoiles</Text>
      </View>
      <Divider />
      <View style={{marginTop: 10}}>
        <Text style={{fontWeight: "bold", marginBottom: 5}}>A propos</Text>
       {user?.biography ? <Text>{user?.biography}</Text> : <Text style={{color: "grey"}}> Pas encore de biographie</Text>} 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: "2em",
  },
  profil: { flexDirection: "column", marginBottom: 5 },
  button: {
    color: "#f14d53",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    border: "2px solid #f14d53",
    borderRadius: 20,
    width: "fit-content",
  },
});

export default UserScreen;
