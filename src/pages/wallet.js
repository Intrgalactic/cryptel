import { DashboardNav } from "components/dashboard-nav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated} from "utils/utilities";
import walletImage from 'assets/images/wallet.png';
import cryptoBook from 'assets/images/crypto-book.png';
import ethLogo from 'assets/images/eth-logo.png';
import { DataParagraph } from "components/data-paragraph";

export default function Wallet({wallet}) {
    const navigate = useNavigate();
    useEffect(() => {
        isAuthenticated(navigate);
    }, [navigate]);

    return (
        <main id="wallet">
            <DashboardNav wallet={wallet} redirect="Dashboard"/>
            <section id="wallet-data-section">

                <div className="wallet-data">
                    <img src={walletImage} alt="cryptocurrency wallet" />
                    {typeof (wallet) !== 'undefined' ? <DataParagraph image={cryptoBook} data={`Your Ethereum Address: ${wallet.accounts[0]}`} /> : null}
                    {typeof (wallet) !== 'undefined' ? <DataParagraph image={ethLogo} data={`Current balance: ${wallet.balance}`} /> : null}
                </div>
            </section>
        </main>
    )
}