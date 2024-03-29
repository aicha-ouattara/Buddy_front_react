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
import moment from "moment";

function UserScreen({ navigation, route }) {
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [reviews, setReviews] = useState({ length: 0, average: 0 });

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${route.params.id}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));

    setIsMe(route.params.id === idUser);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchUser();
    });
    return unsubscribe;
  }, [navigation, token]);

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [token, route]);

  useEffect(() => {
    const reviews = user?.experiences
      ? user?.experiences.flatMap((experience) =>
          experience.reviews.map((review) => review.rating)
        )
      : [];

    const average = (
      reviews.reduce((a, b) => a + b, 0) / reviews.length
    ).toFixed(2);
    setReviews({ length: reviews.length, average: average });
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
  const avatar = user.avatar;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text style={styles.title}>Bonjour, je m'appelle {user.login} </Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: avatar } ?? require("../../assets/profil.png")}
        />
      </View>
      <View style={styles.profil}>
        <Text style={{ color: "grey" }}>
          Membre depuis
          {moment(new Date(user.created_at)).format("MMMM YYYY")}
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
        {reviews.length != 0 ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{reviews.average}</Text>
            <Image
              style={{ height: 24, width: 24 }}
              source={require(`../../assets/icons/star-filled.png`)}
            />
          </View>
        ) : null}
      </View>
      <Divider />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>A propos</Text>
        {user?.biography ? (
          <Text>{user?.biography}</Text>
        ) : (
          <Text style={{ color: "grey" }}> Pas encore de biographie</Text>
        )}
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
    fontSize: 16,
  },
  profil: { flexDirection: "column", marginBottom: 5 },
  button: {
    color: "#f14d53",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#f14d53",
    borderRadius: 20,
    width: 100,
  },
});

export default UserScreen;
