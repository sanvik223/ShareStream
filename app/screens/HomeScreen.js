import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Welcome to ShareStream</Text>
      <View style={styles.buttonContainer}>
        <Button title="Create Room" onPress={() => navigation.navigate('CreateRoom')} />
        <Button title="Join Room" onPress={() => navigation.navigate('JoinRoom')} />
      </View>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        style={styles.banner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
  },
  buttonContainer: {
    width: '80%', gap: 20, marginVertical: 20,
  },
  banner: {
    position: 'absolute', bottom: 0,
  },
});
