import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const SwitchStatus = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SwitchStatus;

// class A extends React.Component {
//   constructor() {
//     super()
//     this.handleCheckBox = this.handleCheckBox.bind(this)
//     this.state = {
//       checked: false
//     }
//   }
  
//   handleCheckBox(e) {
//     this.setState({
//       checked: e.target.checked
//     })
//   }
  
//   render(){
//     return <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked} />
//   }
// }

// ReactDOM.render(<A/>, document.getElementById('app'))