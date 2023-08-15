import "./styles.css";
import {
    convertToValidUserId,
  generateRandomGroupId,
  useConnector,
  useConnectors,
  useCreateFun,
  useFunAccounts,
} from "@fun-xyz/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";


const ConnectorButton = ({ index }) => {
  const { active, activate, deactivate, connectorName, connector } = useConnector({ index });

  return (<button
    style={{margin: "8px"}}
    onClick={() => {
    if (active) {
      deactivate(connector)
      return
    }
    activate(connector)}
  }>{connectorName} {active ? ("Connected"): ("Not connected")}</button>)
}



export default function App() {
    const { connectors } = useConnectors();
    const { account, initializeFunAccount } = useCreateFun()
    const { FunGroupAccounts } = useFunAccounts();


    const initializeExistingWallet = (addr) => {
        initializeFunAccount({
            walletAddr: addr,
        }).catch()
    }

  return (
    <div className="App">
        <Link to="/">back</Link>
      <h1>Initialize existing wallets example</h1>
      <h2>Fun Wallet Account Address: {account}</h2>
      <h2>Connectors</h2>
      <div style={{display: 'flex', justifyContent: 'center', margin: "24px"}}>
      {connectors && connectors.map((_, index) => (
        <ConnectorButton key={index} index={index} />
      ))}
      </div>
        {FunGroupAccounts.length > 0 ? FunGroupAccounts.map((account ) => (
            <div key={account.walletAddr}>
                  <span>wallet: {account.walletAddr}</span>
                  <button onClick={() => { initializeExistingWallet(account.walletAddr)}}>Create group auth wallet</button>
            </div>
        )) : ( <div> No wallets found login to more singers</div>)}
    </div>
  );
}