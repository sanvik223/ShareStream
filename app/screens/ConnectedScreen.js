import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, Switch } from 'react-native';
import * as Device from 'expo-device';
import { Audio } from 'expo-av';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function ConnectedScreen({ navigation }) {
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [sound, setSound] = useState();
  const recording = useRef(null);

  const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);
  const toggleMicMute = () => setIsMicMuted(!isMicMuted);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      recording.current = newRecording;
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      console.log('Recording stopped and stored at', uri);

      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected</Text>

      <View style={styles.deviceRow}>
        <View style={styles.deviceBox}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/android.png' }}
            style={styles.logo}
          />
          <Text style={styles.model}>{Device.modelName}</Text>
        </View>

        <View style={styles.deviceBox}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/smartphone-tablet.png' }}
            style={styles.logo}
          />
          <Text style={styles.model}>Friend's Device</Text>
        </View>
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlText}>🎵 Music Mute</Text>
        <Switch value={isMusicMuted} onValueChange={toggleMusicMute} />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlText}>🎤 Voice Mute</Text>
        <Switch value={isMicMuted} onValueChange={toggleMicMute} />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button
          title="🔴 Start Talking & Share Audio"
          onPress={startRecording}
          disabled={isMicMuted || isMusicMuted}
        />
        <View style={{ height: 10 }} />
        <Button
          title="⏹ Stop Sharing"
          onPress={stopRecording}
          disabled={!recording.current}
        />
      </View>

      {/* Top Banner */}
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
      />

      {/* Bottom Banner */}
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        style={{ position: 'absolute', bottom: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  deviceBox: {
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  model: {
    fontSize: 14,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
  },
  controlText: {
    fontSize: 18,
  },
});
