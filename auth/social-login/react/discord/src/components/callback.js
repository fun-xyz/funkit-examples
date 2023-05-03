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
        const socialLoginProvider = new URLSearchParams(window.location.search).get('provider')
        if (socialLoginProvider) {
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
        return `${result.oauth.provider}###${authId}`;
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