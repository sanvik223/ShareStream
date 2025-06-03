import {
  AdMobInterstitial,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { AdMobConfig } from '../config/admob';

export async function showInterstitialAd() {
  await setTestDeviceIDAsync('EMULATOR');
  await AdMobInterstitial.setAdUnitID(AdMobConfig.interstitial);
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
}

export async function showRewardedAd() {
  await setTestDeviceIDAsync('EMULATOR');
  await AdMobRewarded.setAdUnitID(AdMobConfig.rewarded);
  await AdMobRewarded.requestAdAsync();
  await AdMobRewarded.showAdAsync();
}
