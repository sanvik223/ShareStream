import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function HomeScreen({ navigation }) {
  const [roomCode, setRoomCode] = React.useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TextInput
        placeholder="Enter Room Code"
        value={roomCode}
        onChangeText={setRoomCode}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Join Room"
          onPress={() => navigation.navigate('JoinRoom', { roomCode })}
        />
        <View style={{ width: 20 }} />
        <Button title="Create Room" onPress={() => navigation.navigate('CreateRoom')} />
      </View>

      {/* নিচের ব্যানার অ্যাড */}
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(error) => console.log(error)}
        style={{ position: 'absolute', bottom: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  logo: {
    width: 180, height: 180, resizeMode: 'contain', marginBottom: 20,
  },
  input: {
    borderWidth: 1, width: '100%', padding: 10, marginBottom: 20, borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
