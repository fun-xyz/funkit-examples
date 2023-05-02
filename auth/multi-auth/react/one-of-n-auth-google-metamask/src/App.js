import './App.css';
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { mainnet, goerli, polygon, bsc } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Buffer } from "buffer"
import Connect from './components/connect';

window.Buffer = Buffer

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon, bsc],
  [
    publicProvider()
  ],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})

function App() {
  return (
    <WagmiConfig client={client}>
       <Connect />
   </WagmiConfig>
  )
}

export default App;
