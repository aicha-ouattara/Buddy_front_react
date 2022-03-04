import React from 'react';
import { View, StyleSheet } from 'react-native';

function PinkLine () {
    return <View style={styles.line} />
}

const styles = StyleSheet.create({
    line: {
     height: 10,
     width: 100,
     backgroundColor: '#fde2e1',
      marginTop: 10
    }
  });


export default PinkLine