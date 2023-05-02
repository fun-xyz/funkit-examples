import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const Home = () => {
    const login = async () => {
        const magic = new Magic('pk_live_846F1095F0E1303C', {
            extensions: [new OAuthExtension()],
        });

        // Start the OAuth 2.0 login flow
        await magic.oauth.loginWithRedirect({
            provider: 'google' /* 'google', 'discord', 'twitter', or 'apple' */,
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
