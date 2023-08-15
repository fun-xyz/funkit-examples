import { Link } from "react-router-dom";
import "./styles.css";
import {
  useNetwork,
  Chain,
} from "@fun-xyz/react";


export default function App() {
  const { chainId, SwitchChain, supportedChains } = useNetwork();

  if (!chainId) 
    return <div>loading...</div>;
  return (
    <div className="App">
      <Link to="/">Back</Link>
      <h1>Managing Network Example</h1>
      <ol>
        <li> Current ChainId : {chainId && chainId }</li>
      </ol>

    {
      supportedChains.map((chain) => (<button key={chain} onClick={() => SwitchChain(chain)}>Switch to {chain} </button>))
    }


    </div>
  );
}
