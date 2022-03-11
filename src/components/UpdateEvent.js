import React, {useContext, useEffect, useState, createRef} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View, Button } from 'react-native';
import { GlobalContext } from '../context/Provider';
import NumberPlease from "react-native-number-please";
import SelectDropdown from 'react-native-select-dropdown'
import {API_URL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

function UpdateEvent({navigation}) 
{

    // const state = useContext(GlobalContext);

   
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
    
  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
          console.log("valeur feed screen:", value);
          // navigation.navigate("Protected");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

      const state = useContext(GlobalContext);

      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      // const [image, image] = useState('');
      const [spots, setSpots] = useState(0);
      const [location, setLocation] = useState('');
      const [duration, setDuration] = useState('');
      const [errortext, setErrortext] = useState('');
      const [message, setMessage] = useState("");

      const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

      const handleSubmitButton = () => {
          //console.log(typeof userPhone);
          setErrortext('');
              if (!title) {
                  setErrortext('Please fill title');
                  return;
                  }
  
              if (!content) {
                  setErrortext('Please fill content');
                  return;
              }
  
              if (!spots) {
                  setErrortext('Please fill spots');
                  return;
              }
  
              if (!location) {
                  setErrortext('Please fill location');
                  return;
              }
  
              if (!duration) {
                  setErrortext('Please fill duration');
                  return;
              }
              let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
              if ( re.mioumiou(title) ) {
                  const body = JSON.stringify({
                  "title": title,
                  "content": content,
                  "spots": spots,
                  "location": location,
                  "duration": duration,
              })    
                
  
  
  
      genericFetchWithTokenBody(`${API_URL}/experiences/{id}`, 'PUT', token, bodyExperience) 
      .then(json => {
      console.log(json);
      //navigation.navigate('Login')
      } ) 
      
  
      .catch((error) => {
      console.error("error" , error);
    
      });
      console.log('ok')
      }

  else {
// invalid email, maybe show an error to the user.
setErrortext('Password syntax is not correct');
}
        
    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            experience && ( 
            <Text key={experience.id}></Text>
            {console.log(experience)}
          <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <Text>update</Text>
            <View>
            <TextInput
                  placeholder={experience.title} 
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

            <TextInput
                  placeholder={experience.content}
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

      <NumberPlease
        digits={[{ id: "spots", label: "spots", min: 0, max: 15 }]}
        values={spots}
        onChange={(values) => setSpots(values)}
      />

            <TextInput
                  placeholder={experience.location}
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
  placeholder={experience.duration}
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
            </ScrollView>
            )
         </View>
    );
  }

export default UpdateEvent