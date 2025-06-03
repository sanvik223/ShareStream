import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { showInterstitialAd } from '../utils/admobService';

export default function JoinRoom({ route, navigation }) {
  const { roomCode } = route.params;

  useEffect(() => {
    // Join করার সাথে সাথে Interstitial Ad দেখানো
    showInterstitialAd();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Joining Room: {roomCode}</Text>
      <Button title="Connect" onPress={() => navigation.navigate('ConnectedScreen', { roomId: roomCode })} />
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
