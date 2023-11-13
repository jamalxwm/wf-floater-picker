import React from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

const tierColors = {
  1: 'white',
  2: '#E0E0E0',
  3: '#666666',
  4: '#262626',
};

const tierColorArray = Object.values(tierColors);

const items = [
  {
    name: 'The MoistMaker',
    description: 'If it gets you, it wets you',
    image: 'moistmaker.png',
    tier: 1,
  },
  {
    name: 'Bob from Accounting',
    description: 'The real weekend warrior',
    image: 'http://example.com/toy1.png',
    tier: 2,
  },
  {
    name: 'Ducky Boy',
    description: 'Sometimes wears Prada',
    image: 'http://example.com/toy1.png',
    tier: 3,
  },
  {
    name: 'Goldilocks',
    description: 'Fancy and all out of f*cks',
    image: 'http://example.com/toy1.png',
    tier: 4,
  },
];

const localImages = {
  'The MoistMaker': require('./assets/moistmaker.png'),
  'Bob from Accounting': require('./assets/bob.png'),
  'Ducky Boy': require('./assets/duckyboy.png'),
  Goldilocks: require('./assets/goldilocks.png'),
};

class FloaterPickerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTier: new Animated.Value(1) };
  }

  changeTier = (tier) => {
    Animated.timing(this.state.currentTier, {
      toValue: tier,
      duration: 800, // Adjust duration to your preference
      useNativeDriver: false, // Animated library does not support native driver for color transitions
    }).start();
  };

  renderItem = ({ item }) => {
    const imageUrl = localImages[item.name];
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Image source={imageUrl} style={{ width: 100, height: 100 }} />
      </View>
    );
  };

  render() {
    const filteredItems = items.filter(
      (item) => item.tier === this.state.currentTier
    );
    const tierColorTransition = this.state.currentTier.interpolate({
      inputRange: [1, 2, 3, 4],
      outputRange: tierColorArray, // Assuming tierColors is an array of color strings
    });

    return (
      <Animated.View
        style={[styles.container, { backgroundColor: tierColorTransition }]}
      >
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button title="Tier 1" onPress={() => this.changeTier(1)} />
            <Button title="Tier 2" onPress={() => this.changeTier(2)} />
            <Button title="Tier 3" onPress={() => this.changeTier(3)} />
            <Button title="Tier 4" onPress={() => this.changeTier(4)} />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={filteredItems}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    //flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 300,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10, // Add horizontal padding
  },
});

export default FloaterPickerScreen;
