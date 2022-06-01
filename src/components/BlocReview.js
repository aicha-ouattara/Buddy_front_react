import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import Loading from "../components/Loading";
import { API_URL } from "@env";
import { genericFetchWithToken } from "../api/fetchApiWithToken";
import { authState } from "../store/auth/selectors";
import { useSelector } from "react-redux";

const BlocReview = ({ review, experience, navigation }) => {
  const { token } = useSelector(authState);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = (user) => {
    genericFetchWithToken(`${API_URL}/users/${user}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

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
  );
};

const styles = StyleSheet.create({
  blocReview: {
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
    justifyContent: "space-between",
  },
  link: {
    color: "#f14d53",
    fontWeight: "bold",
  },
});

export default BlocReview;
