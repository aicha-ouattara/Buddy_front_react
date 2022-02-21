import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { GlobalContext } from "../context/Provider";
//import SliderHome from "../components/SliderHome";

function HomeScreen({ navigation }) {
  const state = useContext(GlobalContext);

  return (
    <View>
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("../../assets/travel/surf.jpg")}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 100,
          }}
        >
          <Text>Partager votre expérience</Text>
          <Button
            title="Go to login"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
          {/* <SliderHome /> */}
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
