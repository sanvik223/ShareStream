import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import CreateRoom from './app/screens/CreateRoom';
import JoinRoom from './app/screens/JoinRoom';
import ConnectedScreen from './app/screens/ConnectedScreen';
import DisconnectScreen from './app/screens/DisconnectScreen';
import { AdMobBanner } from 'expo-ads-admob';
import { AdMobConfig } from './app/config/admob';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'ShareStream' }} />
          <Stack.Screen name="CreateRoom" component={CreateRoom} />
          <Stack.Screen name="JoinRoom" component={JoinRoom} />
          <Stack.Screen name="ConnectedScreen" component={ConnectedScreen} />
          <Stack.Screen name="DisconnectScreen" component={DisconnectScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Home Screen এর নিচে Banner Ad */}
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AdMobConfig.banner}
        servePersonalizedAds
        style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
      />
    </>
  );
}
