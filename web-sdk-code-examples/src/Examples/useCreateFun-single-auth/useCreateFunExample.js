import "./styles.css";
import {
    convertToValidUserId,
  useConnector,
  useCreateFun,
} from "@fun-xyz/react";
import { Link } from "react-router-dom";



export default function App() {
    const { activate, account: connectorAccount } = useConnector({index: 0, autoConnect: true});
    const { account, initializeFunAccount } = useCreateFun()

    const initializeSingleAuthFunAccount = () => {
        if (!connectorAccount) {
            activate()
            return
        }
        initializeFunAccount({
            users: [{userId: convertToValidUserId(connectorAccount)}],
            index: 214
        }).catch()
    }

  return (
    <div className="App">
        <Link to="/">back</Link>
      <h1>Initialize single Auth wallet example</h1>
      <h2>Fun Wallet Account Address: {account}</h2>
        <button onClick={initializeSingleAuthFunAccount}>Create Single auth wallet</button>
    </div>
  );
}