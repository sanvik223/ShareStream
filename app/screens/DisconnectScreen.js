import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { showRewardedAd } from '../utils/admobService';

export default function DisconnectScreen({ navigation }) {
  const handleDisconnect = async () => {
    await showRewardedAd();
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Do you want to disconnect?</Text>
      <Button title="Yes, Disconnect" onPress={handleDisconnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  text: {
    fontSize: 18, marginBottom: 20,
  },
});
