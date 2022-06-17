import React, {useContext, useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View, Button } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import NumberPlease from "react-native-number-please";
import SelectDropdown from 'react-native-select-dropdown'
import {API_URL} from '@env';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithTokenBody } from '../../api/fetchApiWithTokenBody';

function AddScreen({navigation}) 
{

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [spots, setSpots] = useState({ id: "spots", value: 0 });
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(0);
<<<<<<< Updated upstream
=======
  const { token } = useSelector(authState);
  const [image, setImage] = useState(null);
>>>>>>> Stashed changes

    // const state = useContext(GlobalContext);

<<<<<<< Updated upstream
  
    const [token, setToken] = useState("");
    

=======
    console.log(bodyExperience);
>>>>>>> Stashed changes

    const handleSubmitPress = () => {
     
      const bodyExperience = JSON.stringify({
        "title": title,
        "content": content,
        "image": "imageexample",
        "spots" : spots.value,
        "location" : location,
        "duration" : 15
      })

        console.log(bodyExperience)

        genericFetchWithTokenBody(`${API_URL}/experiences`, 'POST', token, bodyExperience) 
      .then(json => json.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

        
    }
<<<<<<< Updated upstream



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <Text>ADD</Text>
            <View>
            <TextInput
                  placeholder="Enter title" 
                  onChangeText={(title) =>
                    setTitle(title)
                  }
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
=======
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#f14d53",
      }}
    >
      <Text
        style={{
          marginBottom: 60,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Deviens un local buddy !
      </Text>
      <Text>Ajouter une photo</Text>
      <View style={styles.camera}>
        <Text style={styles.plus} onPress={pickImage}>
          &#65291;
        </Text>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
          }}
        />
      )}
      <View
        style={{
          marginTop: 10,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FCC5C4",
              padding: 40,
              borderRadius: 10,
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
>>>>>>> Stashed changes

            <TextInput
                  placeholder="Enter content" 
                  onChangeText={(content) =>
                    setContent(content)
                  }
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />

<<<<<<< Updated upstream
      <NumberPlease
        digits={[{ id: "spots", label: "spots", min: 0, max: 15 }]}
        values={spots}
        onChange={(values) => setSpots(values)}
      />
=======
            <NumberPlease
              digits={[
                { id: "spots", label: "Disponibilité (s)", min: 0, max: 15 },
              ]}
              values={spots}
              onChange={(values) => setSpots(values)}
              style={{}}
              buttonStyle={styles.number}
            />
>>>>>>> Stashed changes

            <TextInput
                  placeholder="Enter location" 
                  onChangeText={(location) =>
                    setLocation(location)
                  }
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />

<SelectDropdown
	data={["< 1 hour", "1-2 hours", "half day", "whole day"]}
	onSelect={(selectedItem) => {
		setDuration(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSubmitPress}>Add
              </TouchableOpacity>
            </View>
<<<<<<< Updated upstream
            </ScrollView>

         </View>
    );
  }

export default AddScreen
=======
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
              defaultButtonText={"Duration"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.data;
              }}
              rowTextForSelection={(item, index) => item.hours}
              buttonStyle={styles.dropdown}
            />

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
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  number: { backgroundColor: "black", borderWidth: 0, borderRadius: 20 },
  dropdown: {
    marginTop: 10,
    marginLeft: 48,
    borderRadius: 20,
  },
  plus: {
    fontSize: 40,
    color: "#f14d53",
  },
  camera: {
    backgroundColor: "#FCC5C4",
    borderRadius: 10,
    paddingLeft: 175,
    paddingBottom: 25,
    paddingRight: 175,
    paddingTop: 25,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomColor: "white",
    borderColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
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
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});
>>>>>>> Stashed changes
