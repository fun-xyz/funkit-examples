# Google Auth
Authenticate wallet with Google.

Google can be used as a form of authentication for Fun Wallet.

Google login will be done through a frontend interface. See an example project [here](https://github.com/TheFunGroup/fun-wallet-examples/tree/main/auth/social-login/react/google).

The following shows creating a Fun Wallet with Google Sign in a react app. When the `Login Fun Wallet with Google` button is clicked, users will be redirected to Google's sign in page. After they sign in, the Google Account is used to create a Fun Wallet.

**callback.js**
```js
import { ethers } from "ethers"
import { FunWallet, configureEnvironment } from "fun-wallet"
import { MultiAuthEoa } from "fun-wallet/auth"
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { useEffect, useState } from "react";

const Callback = (props) => {
    const [result, setResult] = useState("")
    const [funWalletAddr, setFunWalletAddr] = useState("")

    const magic = new Magic('pk_live_846F1095F0E1303C', {
        extensions: [new OAuthExtension()],
    });

    useEffect(() => {
        const configureFunWalletEnv = async () => {
            const options = {
                chain: 5, // 5 for Goerli, 1 for Mainnet
                apiKey: "MYny3w7xJh6PRlRgkJ9604sHouY2MTke6lCPpSHq"
            }
            await configureEnvironment(options)
        }
        configureFunWalletEnv()
    })

    useEffect(() => {
        if (magic.oauth) {
            magic.oauth.getRedirectResult().then((result) => {
                setResult(result)
            })
        }
    }, [])

    useEffect(() => {
        if (result) {
            buildWallet(result)
        }
    }, [result])

    const getAuthId = (result) => {
        let authId = result.oauth.userInfo.email;
        return result.oauth.provider+"###"+authId; // e.g., google###elonmusk@gmail.com
    }

    const getFunWallet = async (uniqueId) => {
        return new FunWallet({ uniqueId, index: 0 }) // No.0 wallet for the uniqueId
    }

    const buildWallet = async (result) => {
        const authId = getAuthId(result)
        const publicAddress = result.magic.userMetadata.publicAddress
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const auth = new MultiAuthEoa({ provider, authIds: [[authId, publicAddress]] })

        const funWallet = await getFunWallet(await auth.getUniqueId())
        setFunWalletAddr(await funWallet.getAddress())
    }

    return (
        <div className="callback">
            <p>The Fun Wallet is generated at: {funWalletAddr}</p>
        </div>
    )
}

export default Callback;
```

**home.js**
```js
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const Home = () => {
    const login = async () => {
        const magic = new Magic('pk_live_846F1095F0E1303C', {
            extensions: [new OAuthExtension()],
        });

        // Start the OAuth 2.0 login flow
        await magic.oauth.loginWithRedirect({
            provider: 'google',
            redirectURI: 'http://localhost:3000/callback',
        });
    }

    return (
        <div>
            <header className="App-header">
                <button onClick={login}>Login Fun Wallet with Google</button>
            </header>
        </div>
    );
};

export default Home;
```

**App.js**
```js
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/home';
import Callback from './components/callback';

function App() {
  return (
    <div>
      <Router>
        <BrowserRouter>
          <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/callback' element={<Callback />} />
          </Switch>
        </BrowserRouter>
      </Router>
    </div>
  );
}

export default App;
```
