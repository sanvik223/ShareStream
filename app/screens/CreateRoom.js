import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { showInterstitialAd } from '../utils/admobService';

export default function CreateRoom({ navigation }) {
  useEffect(() => {
    // Room তৈরি করার সাথে সাথে Interstitial Ad দেখানো
    showInterstitialAd();
  }, []);

  const handleCreate = () => {
    // আপনি চাইলে এখানে রুম আইড জেনারেট করতে পারেন
    navigation.navigate('ConnectedScreen', { roomId: 'room-123' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Room Page</Text>
      <Button title="Start Room" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  text: {
    fontSize: 20, marginBottom: 20,
  },
});
