import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Bucket({ liked }) {
  return (
      <View>
            <Image style={styles.icone} 
            source={liked ? require('../../assets/icons/bucket-red.png') 
                    : require('../../assets/icons/bucket-grey.png')}
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

export default Bucket;

