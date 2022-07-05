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
  KeyboardAvoidingView,
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
  const spotNumbers = [
    { id: "spots", label: "Disponibilité (s)", min: 0, max: 15 },
  ];
  const initialValues = [{ id: "spots", value: 0 }];
  const [spotsValue, setSpotsValue] = useState(initialValues);
  const [spots, setSpots] = useState(0);
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(0);
  const { token } = useSelector(authState);
  const [image, setImage] = useState(null);
  const [errortext, setErrortext] = useState("");

  const cleanForm = () => {
    setTitle("");
    setContent("");
    setSpots(0);
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
      spots,
      image,
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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#f14d53",
      }}
    >
      <KeyboardAvoidingView enabled>
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
                // marginTop: 8,
                fontSize: 20,
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
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
                  // padding: 40,
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

                {/* <NumberPlease
              digits={[
                { id: "spots", label: "Disponibilité (s)", min: 0, max: 15 },
              ]}
              values={spots}
              onChange={(values) => setSpots(values)}
              buttonStyle={styles.number}
            /> */}
                {/* 
              <NumberPlease
                digits={spotNumbers}
                values={spots}
                onChange={(values) => setSpots(values)}
                buttonStyle={styles.number}
              /> */}
                <View style={styles.dropdownNumberss}>
                  <SelectDropdown
                    data={[
                      { hours: "1 place ", data: 1 },
                      { hours: "2 places", data: 2 },
                      { hours: "3 places", data: 3 },
                      { hours: "4 places", data: 4 },
                      { hours: "5 places", data: 5 },
                      { hours: "6 places", data: 6 },
                      { hours: "7 places", data: 7 },
                      { hours: "8 places", data: 8 },
                      { hours: "9 places", data: 9 },
                      { hours: "10 places", data: 10 },
                      { hours: "11 places", data: 11 },
                      { hours: "12 places", data: 12 },
                      { hours: "13 places", data: 12 },
                      { hours: "14 places", data: 12 },
                      { hours: "15 places", data: 12 },
                    ]}
                    onSelect={(selectedItem) => {
                      setSpots(selectedItem.data);
                    }}
                    // value={selectedItem.data}
                    defaultButtonText={"Nombres de places"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.data;
                    }}
                    rowTextForSelection={(item, index) => item.hours}
                    buttonStyle={styles.dropdownNumber}
                    buttonTextStyle={styles.text}
                    rowStyle={styles.dropdown4RowStyle}
                  />
                </View>

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
                <View style={styles.dropdownNumbers}>
                  <SelectDropdown
                    data={[
                      { hours: "< 1", data: 1 },
                      { hours: "1-2 heures", data: 2 },
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
                    // buttonStyle={styles.dropdown}
                    buttonStyle={styles.dropdownNumber}
                    buttonTextStyle={styles.text}
                    rowStyle={styles.dropdown4RowStyle}
                  />
                </View>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddScreen;
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 120,
    paddingRight: 120,
    height: 50,
    marginTop: 15,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#f14d53",
  },
  textArea: {
    // justifyContent: "flex-start",
    // fontSize: 18,
    marginTop: 10,
  },
  number: {
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 30,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    height: 37,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "transparent",
  },
  dropdownNumber: {
    // borderColor: "white",
    // borderWidth: 1,
    // borderRadius: 30,
    // height: 35,
    // marginTop: 15,
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  dropdown4RowStyle: {},
  dropdownNumbers: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    // height: 35,
    marginTop: 15,
    paddingLeft: 65,
    paddingRight: 65,
    marginBottom: 10,

    // backgroundColor: "transparent",
  },
  dropdownNumberss: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    // height: 35,
    marginTop: 15,
    paddingLeft: 65,
    paddingRight: 65,

    // backgroundColor: "transparent",
  },
  plus: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    backgroundColor: 0,
  },
  camera: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 35,
    marginRight: 35,
  },
  inputStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "white",
    // fontSize: 18,
    textAlign: "center",
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
    // marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 130,
    paddingRight: 130,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 50,
    marginTop: 20,
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
