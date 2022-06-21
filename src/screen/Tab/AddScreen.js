import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Image,
} from "react-native";
import NumberPlease from "react-native-number-please";
import SelectDropdown from "react-native-select-dropdown";
import { API_URL } from "@env";
import { genericFetch } from "../../api/fetchApi";
import { genericFetchWithTokenBody } from "../../api/fetchApiWithTokenBody";
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { color } from "react-native-reanimated";
import { calendarFormat } from "moment";

function AddScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [spots, setSpots] = useState({ id: "spots", value: 0 });
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(0);
  const { token } = useSelector(authState);
  const [image, setImage] = useState(null);
  const [errortext, setErrortext] = useState("");

  const cleanForm = () => {
    setTitle("");
    setContent("");
    setSpots({ id: "spots", value: 0 });
    setLocation("");
    setDuration(0);
    setImage(null);
    navigation.navigate("Feed", {
      refresh: true,
    });
  };
  const handleSubmitPress = () => {
    const bodyExperience = JSON.stringify({
      title,
      content,
      image,
      spots: spots.value,
      location,
      duration,
    });

    setErrortext("");
    if (!title) {
      setErrortext("Vous n'avez pas ajouter de titre");
      return;
    }
    if (!content) {
      setErrortext("Vous n'avez pas ajouter de contenue");
      return;
    }
    if (!spots) {
      setErrortext("Vous n'avez pas ajouter le nombre de place");
      return;
    }
    if (!location) {
      setErrortext("Vous n'avez pas ajouter de lieu");
      return;
    }
    if (!duration) {
      setErrortext("Vous n'avez pas ajouter de durée");
      return;
    }

    console.log(bodyExperience);

    genericFetchWithTokenBody(
      `${API_URL}/experiences`,
      "POST",
      token,
      bodyExperience
    )
      .then((json) => json.json())
      .then((data) => console.log(data))
      // .then((data) => cleanForm())
      .catch((error) => console.error(error))
      .finally(() => cleanForm());
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View
      style={
        {
          // flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          // backgroundColor: "#f14d53",
        }
      }
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 8,
            fontSize: 20,
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Deviens un local buddy !
        </Text>
      </View>
      <View style={styles.camera}>
        <Text style={styles.plus} onPress={pickImage}>
          &#x2295;
        </Text>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 50,
              height: 50,
              marginLeft: 0,
              marginRight: 0,
            }}
          />
        )}
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            {
              // flex: 1,
              // justifyContent: "center",
              // alignContent: "center",
            }
          }
        >
          <View
            style={{
              backgroundColor: "#f14d53",
              padding: 40,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Titre"
                value={title}
                onChangeText={(title) => setTitle(title)}
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={10}
                placeholder="Description"
                value={content}
                onChangeText={(content) => setContent(content)}
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>

            <NumberPlease
              digits={[
                { id: "spots", label: "Disponibilité (s)", min: 0, max: 15 },
              ]}
              values={spots}
              onChange={(values) => setSpots(values)}
              buttonStyle={styles.number}
            />

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Localisation"
                value={location}
                onChangeText={(location) => setLocation(location)}
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <SelectDropdown
              data={[
                { hours: "< 1", data: 1 },
                { hours: "1-2 heures", data: 1.5 },
                { hours: "demie journée", data: 12 },
                { hours: "journée", data: 24 },
              ]}
              onSelect={(selectedItem) => {
                setDuration(selectedItem.data);
              }}
              // value={selectedItem.data}
              defaultButtonText={"Durée"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.data;
              }}
              rowTextForSelection={(item, index) => item.hours}
              buttonStyle={styles.dropdown}
            />
            {errortext != "" && (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            )}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>Envoyez</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default AddScreen;
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "white",
    borderWidth: 1,
    padding: 1,
    borderRadius: 30,
    paddingLeft: 80,
    paddingRight: 80,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    fontSize: 20,
  },
  number: {
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 30,
    marginBottom: 10,
  },
  dropdown: {
    borderRadius: 30,
    height: 40,
    backgroundColor: "transparent",
  },
  plus: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    backgroundColor: 0,
  },
  camera: {
    backgroundColor: "#f14d53",
    borderRadius: 10,
    paddingLeft: 175,
    paddingBottom: 10,
    paddingRight: 175,
    paddingTop: 10,
    marginTop: 5,
  },
  inputStyle: {
    // flex: 1,
    color: "black",
    fontSize: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderBottomColor: "white",
    borderColor: "white",
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 0,
    color: "white",
    borderColor: "black",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 80,
    paddingRight: 80,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    // margin: 10,
  },
  errorTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
});
