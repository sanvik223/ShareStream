import React from 'react'; import { View, Text, StyleSheet } from 'react-native'; import { useRoute } from '@react-navigation/native'; import { AdMobBanner } from 'expo-ads-admob'; import { AdMobConfig } from '../config/admob';

export default function ConnectedScreen() { const route = useRoute(); const { roomId } = route.params;

return ( <View style={styles.container}> <Text style={styles.text}>✅ Connected to Room</Text> <Text style={styles.roomId}>Room ID: {roomId}</Text> <Text style={styles.text}>🎵 Real-time audio and song streaming coming next...</Text> <AdMobBanner
bannerSize="smartBannerPortrait"
adUnitID={AdMobConfig.banner}
servePersonalizedAds
style={styles.banner}
/> </View> ); }

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, }, text: { fontSize: 18, marginBottom: 10, }, roomId: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, }, banner: { position: 'absolute', bottom: 0, }, });

