import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

function App() {
  const [status, setStatus] = useState('Unknown');

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={status}
        onValueChange={(value, index) => setStatus(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Select status" value="Unknown" />
        <Picker.Item label="Australia" value="Australia" />
        <Picker.Item label="Belgium" value="Belgium" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Japan" value="Japan" />
      </Picker>
      <Text style={styles.text}>Your conuntry: {country}</Text>
    </View>
  );
}

export default App;