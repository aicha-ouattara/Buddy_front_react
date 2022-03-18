import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Visible({ visible }) {
  return (
      <View>
            <Image style={styles.icone} 
            source={visible ? require('../../assets/visible.png') 
                    : require('../../assets/invisible.png')}
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

export default Visible;