import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GlobalProvider from './src/context/Provider';
import Nav from './src/navigation/nav';

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
    <Nav />
  </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
