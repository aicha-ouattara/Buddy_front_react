import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './Tab/FeedScreen';
import ProfileScreen from './Tab/ProfileScreen';
import SearchScreen from './Tab/SearchScreen';
import AddScreen from './Tab/AddScreen';
import FavoritesScreen from './Tab/FavoritesScreen';

function ProtectedScreen() {

    


    //Permet de créer un groupe de screen avec une navbar en bas
    const Tab = createBottomTabNavigator();

    return (

      <Tab.Navigator screenOptions={{headerShown: false}}>
        
        <Tab.Screen name="Feed" component={FeedScreen} options= {{
        
        tabBarIcon: ({focused}) => (
         
         <View>
            <Image
            source={require('../../assets/map.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              // tintColor: focused ? '#e32f45' : '#748c94',
            }}/>
          </View>

        ),

      }} />


      <Tab.Screen name="Recherche" component={SearchScreen} 
      options= {{

        tabBarIcon: ({focused}) => (

          <View>
            <Image
            source={require('../../assets/compass.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              // tintColor: focused ? '#e32f45' : '#748c94',
            }}/>
          </View>

        ),

      }} />


      <Tab.Screen name="Créer une expérience" component={AddScreen} options= {{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
            source={require('../../assets/add.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              // tintColor: focused ? '#e32f45' : '#748c94',
            }}/>
          </View>
        ),
      }} />  
      <Tab.Screen name="Mes listes" component={FavoritesScreen} options= {{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
            source={require('../../assets/icons/bucket-red.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              // tintColor: focused ? '#e32f45' : '#748c94',
            }}/>
          </View>
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options= {{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
            source={require('../../assets/pass.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              // tintColor: focused ? '#e32f45' : '#748c94',
            }}/>
          </View>
        ),
      }} />
    </Tab.Navigator>     
    )
  }

export default ProtectedScreen





