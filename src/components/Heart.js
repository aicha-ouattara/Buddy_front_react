import React , { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
function Heart ({handleUnlike, handleLike}) {
    
  
      return (
<View>
<TouchableOpacity onPress={() => {handleUnlike(interest)}} >
    {console.log("yes")}
    <Image style={styles.noheartLogo} source={require('../../assets/heart.png')} />
</TouchableOpacity>
</View>)
}

export default Heart