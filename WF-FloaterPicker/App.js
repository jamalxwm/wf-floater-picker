import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const tierColors = {
  1: 'white',
  2: 'blue',
  3: 'green',
  4: 'red'
}

class FloaterPickerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTier: 1 };
  }


  changeTier = (newTier) => {
    this.setState({ currentTier: newTier });
  };

  render() {
    const backgroundColor = tierColors[this.state.currentTier]
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Button title="Change Tier" onPress={() => this.changeTier((this.state.currentTier % 4) + 1)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloaterPickerScreen;