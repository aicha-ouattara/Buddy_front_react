import React, {  useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

//import SliderHome from "../components/SliderHome";

function HomeScreen({ navigation }) {
  

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
