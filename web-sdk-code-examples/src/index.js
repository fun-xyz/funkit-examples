import * as React from "react";
import { createRoot } from "react-dom/client";

import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';


import UseConnectorExample from "./Examples/useConnector/useConnectorExample";
import UseCreateFunExample from "./Examples/useCreateFun-single-auth/useCreateFunExample";
import UseCreateFunGroupExample from "./Examples/useCreateFun-group-auth/useCreateFunExample";
import UseCreateFunExistingExample from "./Examples/useCreateFun-existing-wallet/useCreateFunExample";
import UseConfigExample from "./Examples/useConfig/App"
import UseNetworkExample from "./Examples/useNetwork/App";
import UseActionTransferExample from "./Examples/useAction-transfer/useCreateFunExample"
import UseActionSwapExample from "./Examples/useAction-swap/useCreateFunExample"
import UseGroupExample from "./Examples/useGroup/App"

import {
  configureNewFunStore,
  MetamaskConnector,
  CoinbaseWalletConnector,
  WalletConnectConnector,
  SocialOauthConnector,
  SUPPORTED_OAUTH_PROVIDERS,
  Goerli,
} from "@fun-xyz/react";

window.Buffer = window.Buffer || require("buffer").Buffer;

const DEFAULT_FUN_WALLET_CONFIG = {
  apiKey: "hnHevQR0y394nBprGrvNx4HgoZHUwMet5mXTOBhf",
  chain: Goerli,
};

const DEFAULT_CONNECTORS = [
  MetamaskConnector(),
  CoinbaseWalletConnector("FUN EXAMPLE APP NAME"),
  WalletConnectConnector(),
  SocialOauthConnector(SUPPORTED_OAUTH_PROVIDERS),
];

configureNewFunStore({
  config: DEFAULT_FUN_WALLET_CONFIG,
  connectors: DEFAULT_CONNECTORS,
});

const Home = () => {
  return (
    <div>
      <h1>Web SDK examples</h1>
      <ol>
        <li>
          <Link to="useConnector">UseConnector Example</Link>
        </li>
        <li>
          <Link to="useCreateFun-single">Create new single auth fun wallet </Link>
        </li>
        <li>
          <Link to="useCreateFun-group">Create new group auth fun wallet </Link>
        </li>
        <li>
          <Link to="useCreateFun-existing">initialize Existing Wallet </Link>
        </li>
        <li>
          <Link to="useConfig">Update Config Example </Link>
        </li>
        <li>
          <Link to="useNetwork">Chain Switching Example </Link>
        </li>
        <li>
          <Link to="useAction-transfer">useAction Transfer Example </Link>
        </li>
        <li>
          <Link to="useAction-swap">useAction Swap Example </Link>
        </li>
        <li>
          <Link to="useGroup">useGroup Example </Link>
        </li>
      </ol>
    </div>
  )
}



createRoot(document.getElementById("root")).render(
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/useConnector"
          element={<UseConnectorExample />} />


        <Route path="/useCreateFun-single"
          element={<UseCreateFunExample />} />


        <Route path="/useCreateFun-group"
          element={<UseCreateFunGroupExample />} />


        <Route path="/useCreateFun-existing"
          element={<UseCreateFunExistingExample />} />


        <Route path="/useConfig"
          element={<UseConfigExample />} />


        <Route path="/useNetwork"
          element={<UseNetworkExample />} />


        <Route path="/useAction-transfer"
          element={<UseActionTransferExample />} />


        <Route path="/useAction-swap"
          element={<UseActionSwapExample />} />


        <Route path="/useGroup"
          element={<UseGroupExample />} />

      </Routes>
    </Router>
  </div>

);


