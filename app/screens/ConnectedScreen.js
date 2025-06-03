import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function ConnectedScreen({ route }) {
  const { roomId } = route.params;

  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        style={styles.topBanner}
      />
      <Text style={styles.text}>Connected to Room: {roomId}</Text>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        style={styles.bottomBanner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'space-between',
    alignItems: 'center', paddingTop: 40, paddingBottom: 20,
  },
  text: {
    fontSize: 18,
  },
  topBanner: {
    marginTop: 20,
  },
  bottomBanner: {
    marginBottom: 10,
  },
});
