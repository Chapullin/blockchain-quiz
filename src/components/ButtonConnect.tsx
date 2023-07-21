import { useEthers } from "@usedapp/core";

const ButtonConnect = () => {
    const { account, deactivate, activateBrowserWallet } = useEthers();
    // 'account' being undefined means that we are not connected.
    if (account) return <button onClick={() => deactivate()}>Disconnect</button>;
    else return <button onClick={() => activateBrowserWallet()}>Connect</button>;
};

export default ButtonConnect;
