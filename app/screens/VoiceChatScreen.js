import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { createRoom, joinRoom } from '../utils/webrtcSignaling';

export default function VoiceChatScreen({ route }) {
  const { roomId, isHost } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const localStream = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    const init = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      localStream.current = stream;

      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      if (isHost) {
        await createRoom(roomId, peerConnection.current);
      } else {
        await joinRoom(roomId, peerConnection.current);
      }
    };

    init();

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
      <Text style={styles.title}>Voice Room: {roomId}</Text>
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