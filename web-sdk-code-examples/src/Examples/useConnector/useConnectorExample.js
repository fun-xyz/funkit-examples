import { useMemo } from "react";
import "./styles.css";
import {
  useConnector,
  useConnectors,
  SocialLoginConnector,
} from "@fun-xyz/react";
import { Link } from "react-router-dom";


const ConnectorDisplay = ({ index }) => {
    const { activate, active, account, connectorName, connector } = useConnector({
        index
      });

    return (
        <div className="App"
        style={{margin: "6px", padding: "6px", border: "1px solid black"}}
        >
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
    )
}

const SocialConnectorDisplay = ({ index }) => {
    const { activate, deactivate, active, account, connectorName, connector } = useConnector({
        index
      });

    return (
        <div className="App"
        style={{margin: "6px", padding: "6px", border: "1px solid black"}}
        >
      <ol>
        <li> Connector Name: {connectorName}</li>
        <li>{active ? "Connected" : "Not Connected"}</li>
        {active && <li>Address: {account}</li>}
      </ol>
    <div style={{margin: "6px"}}>
    {connector instanceof SocialLoginConnector && connector.supportedAuthProviders.map((provider) => {
        return (
            <button
            onClick={() => {
              activate(connector, provider);
            }}
          >
            {" "}
            Activate {provider}
          </button>
        )
    })}
    </div>

      <button
        onClick={() => {
            deactivate(connector);
        }}
      >
        {" "}
        deactivate
      </button>
    </div>
    )
}


export default function App() {
    const { connectors, activeConnectors, deactivateAll } = useConnectors();
    const active = useMemo(() => {
        return activeConnectors.filter((connector) => connector.active);
    }, [activeConnectors]);
  return (
    <div className="App">
        <Link to="/">back</Link>
      <h1>Connector example</h1>
      <h2>There are {connectors.length} connectors of which {active.length} are active</h2>
        <button onClick={() => deactivateAll()}>Deactivate All</button>
    <ConnectorDisplay index={0} />
    <SocialConnectorDisplay index={3} />
    </div>
  );
}
