import './App.css'
import {
    DAppProvider,
    Config,
    Goerli,
} from '@usedapp/core'
import {getDefaultProvider} from 'ethers'
import Home from "./Home";

const config: Config = {
    networks: [Goerli],
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: getDefaultProvider('goerli'),
    },
}

function App() {
        return (
            <DAppProvider config={config}>
                <Home/>
            </DAppProvider>
        )
}

export default App
