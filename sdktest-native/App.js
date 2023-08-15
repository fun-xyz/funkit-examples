import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '@expo/browser-polyfill';
import 'react-native-get-random-values';

import { FunWallet, Auth, configureEnvironment } from '@fun-xyz/core'

// Import keys
const PRIVATE_KEY = "1bfda777ddaf097a791e98ea9bb8923f33f9a9e93c4ec3b0d8370de10782a825"
const API_KEY = "" // get from https://dashboard.fun.xyz

// Configure environment options
const options = {
  chain: "goerli",
  gasSponsor: {
    sponsorAddress: "0x175C5611402815Eba550Dad16abd2ac366a63329"
  },
  apiKey: API_KEY
}

const createWallet = async () => {
  await configureEnvironment(options)
  const auth = new Auth({ privateKey: `0x${PRIVATE_KEY}` })

  // Create a FunWallet instance
  const funWallet = new FunWallet({
    users: [{ userId: await auth.getAddress() }],
    uniqueId: await auth.getWalletUniqueId()
  })
  const receipt = await funWallet.create(auth, await auth.getAddress())
  console.log(receipt)
}



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={createWallet}>
        <Text>CLICK</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});