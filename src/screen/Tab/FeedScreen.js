import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { genericFetchWithToken } from "../../api/fetchApiWithToken";
import ContainerCityCarrousel from "../../components/ContainerCityCarrousel";
import ContainerFeedExperience from "../../components/ContainerFeedExperience";
import Loading from "../../components/Loading";
import { API_URL } from "@env";
import { authState } from "../../store/auth/selectors";
import { useSelector } from "react-redux";

function FeedScreen({ navigation }) {
  const { token } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = () => {
    genericFetchWithToken(`${API_URL}/experiences?visible=true`, "GET", token)
      .then((json) => json.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExperiences();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchExperiences();
  }, [token]);

  return (
    <View style={styles.mainBody}>
      {isLoading ? (
        <Loading />
      ) : experiences.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <ContainerCityCarrousel
              experiences={experiences}
              navigation={navigation}
            />
          }
          ListFooterComponent={
            <ContainerFeedExperience
              experiences={experiences}
              navigation={navigation}
            />
          }
        />
      ) : (
        <View style={styles.noExp}>
          <Text>Aucune expérience...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 10,
  },
  noExp: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
});

export default FeedScreen;
