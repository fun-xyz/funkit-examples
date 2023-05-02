import { FunWallet, configureEnvironment } from "fun-wallet"
import { MultiAuthEoa } from "fun-wallet/auth"
import { useAccount, useConnect, useSigner, useDisconnect } from 'wagmi'
import { useEffect, useState } from "react"

const Connect = () => {
    const { connector, isConnected } = useAccount()
    const { data: signer } = useSigner()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const [funWalletAddr, setFunWalletAddr] = useState("")
    const { disconnect } = useDisconnect()

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
        async function connectEOA() {
            let provider = await connector.getProvider({ chainId: 5 })
            if (signer && provider) {
                const eoaAddr = await signer.getAddress();
                connectFunWallet(eoaAddr, provider, eoaAddr);
            }
        }

        if (connector) {
            connectEOA()
        }
    }, [signer, connector])

    async function connectFunWallet(authId, provider, publicKey) {
        console.log("publicKey: ", publicKey)
        const auth = new MultiAuthEoa({ provider, authIds: [[authId, publicKey]] })
        const uniqueId = await auth.getUniqueId()
        const funWallet = new FunWallet({ uniqueId, index: 0 }) // No.0 wallet for the uniqueId
        setFunWalletAddr(await funWallet.getAddress())
    }

    if (isConnected) {
        return (
            <div>
                <div>The Fun Wallet is generated at: {funWalletAddr}</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        )
    }

    return (
        <div>
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
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )
}

export default Connect;