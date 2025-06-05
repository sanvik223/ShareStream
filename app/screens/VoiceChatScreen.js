import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MediaStream, RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

export default function VoiceChatScreen({ route }) {
  const { roomId } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const localStream = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const startVoiceChat = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      localStream.current = stream;
      peerConnection.current = new RTCPeerConnection();

      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      // TODO: Add Firebase signaling logic here
    };

    startVoiceChat();

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks()[0].enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Chat Room: {roomId}</Text>
      <Button title={isMuted ? 'Unmute Mic' : 'Mute Mic'} onPress={toggleMute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 20, marginBottom: 20,
  },
});