import "./styles.css";
import {
    convertToValidUserId,
  generateRandomGroupId,
  useConnector,
  useConnectors,
  useCreateFun,
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
    const { connectors, activeConnectors } = useConnectors();
    const { account, initializeFunAccount } = useCreateFun()

    const activeConnections = useMemo(() => {
      return activeConnectors.filter((connector) => connector.active);
  }, [activeConnectors]);

    const initializeGroupAuthWallet = () => {
        if (activeConnections.length <= 1) {
            alert("Please connect at least 2 connectors")
            return
        }
        initializeFunAccount({
            users: {
              userId: convertToValidUserId(activeConnections[0].account),
            },
            index: 4567,
        }).catch()
    }

  return (
    <div className="App">
        <Link to="/">back</Link>
      <h1>Initialize Group Auth wallet example</h1>
      <h2>Fun Wallet Account Address: {account}</h2>
      <h2>Connectors</h2>
      <div style={{display: 'flex', justifyContent: 'center', margin: "24px"}}>
      {connectors && connectors.map((_, index) => (
        <ConnectorButton key={index} index={index} />
      ))}
      </div>

        <button onClick={initializeGroupAuthWallet}>Create group auth wallet</button>

      <h2>Group Actions</h2>
      <ol>
        <li><button>Create new group using all connected auth</button></li>
        <li><button>Set the new Group as an owner</button></li>
        <li><button>Remove the last Auth from the group</button></li>
        <li><button>add the user we removed to the group</button></li>
        <li><button>Update the threshold to require 2 signatures</button></li>
        <li><button>Delete Group</button></li>
      </ol>
    </div>
  );
}