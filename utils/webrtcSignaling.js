import database from '@react-native-firebase/database';

export const createRoom = async (roomId, peerConnection) => {
  const roomRef = database().ref(`rooms/${roomId}`);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await roomRef.set({ offer });

  roomRef.on('value', async snapshot => {
    const data = snapshot.val();
    if (!peerConnection.currentRemoteDescription && data?.answer) {
      const remoteDesc = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    }
  });

  roomRef.child('calleeCandidates').on('child_added', snapshot => {
    const candidate = new RTCIceCandidate(snapshot.val());
    peerConnection.addIceCandidate(candidate);
  });

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      roomRef.child('callerCandidates').push(event.candidate.toJSON());
    }
  };
};

export const joinRoom = async (roomId, peerConnection) => {
  const roomRef = database().ref(`rooms/${roomId}`);
  const snapshot = await roomRef.once('value');
  const roomData = snapshot.val();

  if (!roomData?.offer) return;

  await peerConnection.setRemoteDescription(new RTCSessionDescription(roomData.offer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  await roomRef.update({ answer });

  roomRef.child('callerCandidates').on('child_added', snapshot => {
    const candidate = new RTCIceCandidate(snapshot.val());
    peerConnection.addIceCandidate(candidate);
  });

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      roomRef.child('calleeCandidates').push(event.candidate.toJSON());
    }
  };
};