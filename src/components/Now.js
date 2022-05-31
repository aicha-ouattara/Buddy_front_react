import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Now({ liked }) {
  return (
      <View>
            <Image style={styles.icone} 
            source={liked ? require('../../assets/icons/now-red.png') 
                    : require('../../assets/icons/now-grey.png')}
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

