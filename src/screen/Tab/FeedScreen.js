import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet, TexT } from "react-native";
import { genericFetch } from "../../api/fetchApi";
import { genericFetchWithToken } from "../../api/fetchApiWithToken";
import ContainerCityCarrousel from "../../components/ContainerCityCarrousel";
import ContainerFeedExperience from "../../components/ContainerFeedExperience";
import Loading from "../../components/Loading";
import { API_URL } from "@env";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/Provider";
// selector import pour token
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";

function FeedScreen({ navigation }) {
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const { token } = useSelector(authState);

  console.log("token", token);


  return (
    <View style={styles.mainBody}>
      {isLoading ? (
        <Loading />
      ) : (
        experiences.length > 0 && (
          <ScrollView>
            <ContainerCityCarrousel
              experiences={experiences}
              navigation={navigation}
            />
            <ContainerFeedExperience
              experiences={experiences}
              userId={userId}
              navigation={navigation}
            />
          </ScrollView>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 10,
  },
});

export default FeedScreen;
