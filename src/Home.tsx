import './App.css'
import {formatEther} from '@ethersproject/units'
import {
    useTokenBalance,
    useEthers,
    Goerli,
} from '@usedapp/core'
import ButtonConnect from "./components/ButtonConnect";
import {QUIZ_ADDRESS} from "./utils/enums";

function Home() {
    const goerliNetworkId = Goerli.chainId;
    const {account, chainId, switchNetwork} = useEthers();

    const quizBalance = useTokenBalance(QUIZ_ADDRESS[chainId as any], account)

    return (
        <>
            <ButtonConnect/>
            <button
                onClick={() => switchNetwork(goerliNetworkId)}
                hidden={chainId === goerliNetworkId}
            >
                Switch to Goerli
            </button>

            {
                quizBalance && (
                    <div className="balance">
                        <br/>
                        Address:
                        <p className="bold">{account}</p>
                        <br/>
                        Quiz Balance:
                        <p className="bold">{formatEther(quizBalance)}</p>
                    </div>
                )
            }
        </>

    )
}

export default Home
