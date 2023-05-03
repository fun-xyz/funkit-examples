# Wallet Connect
<Text fontSize={20} soften fontWeight={600}>
  Authenticate wallet with WalletConnect.
</Text>
<br></br>

[Wallet Connect](https://docs.walletconnect.com/2.0/) can be used as a form of authentication for Fun Wallet.


Wallet Connect will be done through a frontend interface. See an example project [here](https://github.com/TheFunGroup/fun-wallet-examples/tree/main/auth/crypto-wallet/react/wagmi/wallet-connect).

The following shows creating a Fun Wallet with Wallet Connect in a react app. When the Wallet Connect button is clicked, users will be prompted to connect their wallet through the Wallet Connect modal. After they connect their wallet, the eoa from their wallet is used to create a Fun Wallet.
