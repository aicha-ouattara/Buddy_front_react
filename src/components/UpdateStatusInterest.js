import React, {useContext, useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View, Button } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import NumberPlease from "react-native-number-please";
import SelectDropdown from 'react-native-select-dropdown'
import {API_URL} from '@env';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';

function UpdateStatusInterest({navigation}) 
{

  const [accepted, setAccepted] = useState();


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
     
      const bodyInterest = JSON.stringify({
        "accepted": accepted,
     
      })

        console.log(bodyInterest)

        genericFetchWithTokenBody(`${API_URL}/interests`, 'PUT', token, bodyInterest) 
      .then(json => json.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

        
    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            interest && ( 
            <Text key={interest.id}></Text>
          <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <Text>Accept/Refuse invit</Text>
            <View>
       

    

<SelectDropdown
	data={[0, 1]}

	onSelect={(selectedItem) => {
		setAccepted(selectedItem)
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

export default UpdateStatusInterest