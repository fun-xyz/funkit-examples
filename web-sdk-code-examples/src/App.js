import "./styles.css";
import {
  configureNewFunStore,
  MetamaskConnector,
  CoinbaseWalletConnector,
  WalletConnectConnector,
  SocialOauthConnector,
  SUPPORTED_OAUTH_PROVIDERS,
  Goerli,
  useConnector
} from "@fun-xyz/react";

const DEFAULT_FUN_WALLET_CONFIG = {
  apiKey: "hnHevQR0y394nBprGrvNx4HgoZHUwMet5mXTOBhf",
  chain: Goerli
};

const DEFAULT_CONNECTORS = [
  MetamaskConnector(),
  CoinbaseWalletConnector("FUN EXAMPLE APP NAME"),
  WalletConnectConnector(),
  SocialOauthConnector(SUPPORTED_OAUTH_PROVIDERS)
];

configureNewFunStore({
  config: DEFAULT_FUN_WALLET_CONFIG,
  connectors: DEFAULT_CONNECTORS
});

export default function App() {
  const { activate, active, account, connectorName, connector } = useConnector({
    index: 0
  });

  return (
    <div className="App">
      <h1>Connector example</h1>
      <ol>
        <li> Connector Name: {connectorName}</li>
        <li>{active ? "Connected" : "Not Connected"}</li>
        {active && <li>Address: {account}</li>}
      </ol>

      <button
        onClick={() => {
          activate(connector);
        }}
      >
        {" "}
        Activate {connectorName}
      </button>
    </div>
  );
}
