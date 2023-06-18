import { Header } from "components/header/header";
import { WalletProviderContext } from "context/walletProviderContext";
import { AuthContext } from "context/authContext";
import { SwapWidget } from "@uniswap/widgets";
import '@uniswap/widgets/fonts.css';
import { Loader } from "components/loading-circle";
export default function Swap({ wallet, isProviderAvailable, connectWallet, setWallet, isLogged }) {
    return (
        /* Page to be implemented
        <AuthContext.Provider value={isLogged}>
            <WalletProviderContext.Provider value={{ wallet: wallet, isProviderAvailable: isProviderAvailable, connectWallet: connectWallet, setWallet: setWallet, isLogged: isLogged }}>
                <main id="swap">
                    <Header />
                    <section id="swap-section">
                        <SwapWidget />
                    </section>
                    <Loader />
                </main>
                
            </WalletProviderContext.Provider>
        </AuthContext.Provider> */ 
        <></>
        
    )
}