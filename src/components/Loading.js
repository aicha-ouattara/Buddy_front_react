import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function Loading() {
    return (
        <View  style={styles.mainBody}><ActivityIndicator color="#f14d53" /> </View>
        )
}
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    }
  });
    
export default Loading;
