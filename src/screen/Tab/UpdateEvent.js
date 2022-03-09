import React, {useContext, useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View, Button } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import NumberPlease from "react-native-number-please";
import SelectDropdown from 'react-native-select-dropdown'
import {API_URL} from '@env';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithTokenBody } from '../../api/fetchApiWithTokenBody';

function UpdateEvent({navigation}) 
{

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [spots, setSpots] = useState({ id: "spots", value: 0 });
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(0);

    // const state = useContext(GlobalContext);

    const body = JSON.stringify({
      "login": "kevin",
      "password": "kevin"
  })
    const [token, setToken] = useState("");
    
    useEffect(() => {
      genericFetch(`${API_URL}/login`, 'POST', body) 
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
    }, [])
  


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

        genericFetchWithTokenBody(`${API_URL}/experiences`, 'PUT', token, bodyExperience) 
      .then(json => json.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

        
    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            experience && ( 
            <Text key={experience.id}></Text>
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