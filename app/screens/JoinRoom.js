import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function JoinRoomScreen() {
  const [roomId, setRoomId] = useState('');
  const navigation = useNavigation();

  const handleJoin = () => {
    if (roomId.trim().length > 0) {
      navigation.navigate('Connected', { roomId });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 Join a Room</Text>
      <TextInput
        placeholder="Enter Room ID"
        value={roomId}
        onChangeText={setRoomId}
        style={styles.input}
      />
      <Button title="Join" onPress={handleJoin} />
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
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 22, marginBottom: 20,
  },
  input: {
    width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20,
    borderRadius: 5,
  },
  banner: {
    position: 'absolute', bottom: 0,
  },
});
