import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdMobRewarded } from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export default function DisconnectScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const loadAd = async () => {
      try {
        await AdMobRewarded.setAdUnitID(AdMobConfig.rewarded);
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
      } catch (error) {
        console.log('Rewarded Ad Error:', error);
      }
    };

    loadAd();
  }, []);

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disconnected from room</Text>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20,
  },
});