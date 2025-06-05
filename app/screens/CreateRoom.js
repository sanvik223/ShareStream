import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';
import { v4 as uuidv4 } from 'uuid';

export default function CreateRoomScreen() {
  const navigation = useNavigation();
  const roomId = uuidv4().slice(0, 8);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 Room Created</Text>
      <Text style={styles.roomId}>Room ID: {roomId}</Text>
      <Button title="Go to Room" onPress={() => navigation.navigate('Connected', { roomId })} />
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
    fontSize: 22, marginBottom: 10,
  },
  roomId: {
    fontSize: 18, marginBottom: 20,
  },
  banner: {
    position: 'absolute', bottom: 0,
  },
});
