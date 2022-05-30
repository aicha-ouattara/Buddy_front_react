import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Now({ liked }) {
  return (
      <View>
            <Image style={styles.icone} 
            source={liked ? require('../../assets/now-red.png') 
                    : require('../../assets/now-grey.png')}
            />
      </View>
  )
}

const styles = StyleSheet.create({
  icone: {
    width: 24,
    height: 24,
  },
});

export default Now;

