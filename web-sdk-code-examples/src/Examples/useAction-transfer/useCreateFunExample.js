import React from "react";
import "./styles.css";
import {
  ActionType,
  convertToValidUserId,
  useAction,
  useConnector,
  useCreateFun,
} from "@fun-xyz/react";
import { Link } from "react-router-dom";
import { hexToBigInt, formatUnits } from "viem";


const TransferButton = ({account}) => {
  const { executeOperation, result, loading } = useAction({
    action: ActionType.Transfer,
    params: {
      to: account,
      amount: 0.01,
    }
  })

  return (
    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
      <span>{result && result.txId}</span>
      <button style={{maxWidth: "400px", margin: "16px"}} onClick={() => executeOperation()}>{loading ? ("Transfer Sent"): (`Transfer 0.01 ETH to ${account}`)}</button>
    </div>)
}

export default function App() {
  const {
    activate,
    account: connectorAccount,
    connector,
  } = useConnector({ index: 0, autoConnect: true });
  const { funWallet: wallet, account, initializeFunAccount } = useCreateFun();
  const [balance, setBalance] = React.useState(null);

  const initializeSingleAuthFunAccount = () => {
    if (!connectorAccount) {
      activate();
      return;
    }
    initializeFunAccount({
      users: [{ userId: convertToValidUserId(connectorAccount) }],
      index: 214,
    }).catch();
  };

  React.useEffect(() => {
    if (!account || !wallet) return;
    const getBalance = async () => {
      try {
        const assets = await wallet.getAssets();
        setBalance(
          hexToBigInt(
            assets.tokens["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"]
              .tokenBalance
          )
        );
      } catch (e) {
        console.log(e);
      }
    };
    if (balance !== null) return;
    getBalance();
  }, [account, balance, wallet]);

  return (
    <div className="App">
      <Link to="/">back</Link>
      <h1>Transfer crypto example</h1>
      <h2>Fun Wallet Account Address: {account}</h2>
      <h2>
        Fun Wallet Balance: {balance ? formatUnits(balance, 18) : "loading..."}
      </h2>
      <div style={{margin:"16px"}}>
      <button onClick={() => activate(connector)}>
        {connectorAccount ? "Metamask Connected" : "Connect Metamask"}
      </button>
      <button onClick={initializeSingleAuthFunAccount}>
        Create Single auth wallet
      </button>
      </div>

      {account && balance > 0n && (
        <TransferButton account={connectorAccount} />
      )}
    </div>
  );
}
