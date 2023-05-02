import { FunWallet, configureEnvironment } from "fun-wallet"
import { MultiAuthEoa } from "fun-wallet/auth"
import { getStoredUniqueId } from "fun-wallet/utils"
import { useAccount, useConnect, useSigner, useDisconnect } from 'wagmi'
import { useEffect, useState } from "react"
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { ethers } from "ethers"
import { Redirect } from 'react-router-dom';

const Connect = () => {
    const { connector, isConnected } = useAccount()
    const { data: signer } = useSigner()
    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    const [funWalletAddr, setFunWalletAddr] = useState("")
    const { disconnect } = useDisconnect()
    const [googleLoginResult, setGoogleLoginResult] = useState("")

    const magic = new Magic('pk_live_846F1095F0E1303C', {
        extensions: [new OAuthExtension()],
    });

    // handle google login result
    useEffect(() => {
        const socialLoginProvider = new URLSearchParams(window.location.search).get('provider')
        if (socialLoginProvider) {
            magic.oauth.getRedirectResult().then(async (result) => {
                setGoogleLoginResult(result)
            })
        }
    }, [magic.oauth])
    
    // create fun wallet
    useEffect(() => {
        const configureFunWalletEnv = async () => {
            const options = {
                chain: 5, // 5 for Goerli, 1 for Mainnet
                apiKey: "MYny3w7xJh6PRlRgkJ9604sHouY2MTke6lCPpSHq"
            }
            await configureEnvironment(options)
        }

        const createFunWallet = async () => {
            if (googleLoginResult && signer && connector) {
                // initial set up
                let provider = await connector.getProvider({ chainId: 5 })
                if (provider) {
                    // metamask
                    const metamaskAddr = await signer.getAddress();
                    // google login
                    const authId = getSocialLoginAuthId(googleLoginResult)
                    const publicAddress = googleLoginResult.magic.userMetadata.publicAddress
                    const auth = new MultiAuthEoa({ provider, authIds: [[authId, publicAddress], [metamaskAddr, metamaskAddr]] })
                    await buildFunWallet(auth)
                }
            } else if (googleLoginResult) {
                // google login
                const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
                const authId = getSocialLoginAuthId(googleLoginResult)
                if (await isAuthIdUsed(authId)) {
                    const publicAddress = googleLoginResult.magic.userMetadata.publicAddress
                    const auth = new MultiAuthEoa({ provider, authIds: [[authId, publicAddress]] })
                    await buildFunWallet(auth)
                }
            } else if (connector && signer) {
                // metamask login
                const metamaskAddr = await signer.getAddress();
                // if metamask is already used to initiate a fun wallet
                if (await isAuthIdUsed(metamaskAddr)) {
                    let provider = await connector.getProvider({ chainId: 5 })
                    const auth = new MultiAuthEoa({ provider, authIds: [[metamaskAddr, metamaskAddr]] })
                    await buildFunWallet(auth)
                }
            }
        }

        configureFunWalletEnv().then(async () => {
            await createFunWallet()
        })
    }, [signer, googleLoginResult, connector])

    const isAuthIdUsed = async (authId) => {
        try {
          const uniqueId = await getStoredUniqueId(authId)
          if (uniqueId) {
            return true
          } else {
            return false
          }
        } catch (error) {
          console.log("isAuthIdUsed error: ", error)
          return false
        }
      }

    const getSocialLoginAuthId = (result) => {
        let authId = result.oauth.userInfo.email;
        return `${result.oauth.provider}###${authId}`; // e.g., google###elonmusk@gmail.com
    }

    const googleLogin = async () => {
        await magic.oauth.loginWithRedirect({
            provider: 'google' /* 'google', 'discord', 'twitter', or 'apple' */,
            redirectURI: 'http://localhost:3000/',
        });
    }

    const buildFunWallet = async (auth) => {
        const uniqueId = await auth.getUniqueId()
        const funWallet = new FunWallet({ uniqueId, index: 0 }) // No.0 wallet for the uniqueId
        const funWalletAddr = await funWallet.getAddress()
        console.log("funWalletAddr: ", funWalletAddr)
        setFunWalletAddr(funWalletAddr)
    }

    const disconnectWallet = async () => {
        await disconnect()
        window.location.reload(false)
    }

    if ((isConnected || googleLoginResult) && funWalletAddr) {
        return (
            <div>
                <div>The Fun Wallet is generated at: {funWalletAddr}</div>
                <button onClick={disconnectWallet}>Disconnect Fun Wallet</button>
            </div>
        )
    }

    return (
        <div>
            <p>In this example, we require you to first login both google and metamask.</p>
            <p>Later you can log in to the same fun wallet using either google or metamask.</p>
            <p>You can explore arbitrary combination of auth methods supported by fun wallet.</p>

            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    {isConnected &&
                        connector.id === pendingConnector?.id &&
                        ' (connected)'}
                </button>
            ))}

            <button onClick={googleLogin}>Login Fun Wallet with Google</button>
        </div>
    )
}

export default Connect;