import { Link } from "react-router-dom";
import "./styles.css";
import {
  useConfig,
  Chain,
} from "@fun-xyz/react";


export default function App() {
  const { config, updateConfig } = useConfig();

  if (!config) 
    return <div>loading...</div>;
  return (
    <div className="App">
            <Link to="/">Back</Link>
      <h1>Managing Config Example</h1>
      <ol>
        <li> apiKey : {config && config.apiKey }</li>
        <li>chain : {config.chain instanceof Chain ? config.chain.getChainId() : config.chain}</li>=
        <li>GasSponsor: {config.gasSponsor}</li>
      </ol>

      <button
        onClick={() => {
          if (config.gasSponsor) {
            updateConfig({...config, gasSponsor: null});
            return
          }
          updateConfig({...config, gasSponsor: "Gasless Sponsor Address"});
        }}
      >
        {" "}
        update gas handling
      </button>

      <button
        onClick={() => {
          if (config.chain === "137") {
            updateConfig({...config, chain: "5"});
            return
          }
          updateConfig({...config, chain: "137"});
        }}
      >
        update chain
      </button>
    </div>
  );
}
