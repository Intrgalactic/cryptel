import { JourneyCarousel } from "./journey-carousel";
import { JourneyHeading } from "./journey-heading";
import { useContext } from "react";
import { AuthContext } from "context/authContext";
import { WalletProviderContext } from "context/walletProviderContext";
export function Journey() {
    const isLogged = useContext(AuthContext);
    const walletProvider = useContext(WalletProviderContext);
    return (
        <section id="journey">
            {isLogged === false || walletProvider.wallet === 'undefined' ?  <JourneyHeading/> : null}
            <JourneyCarousel isLogged={isLogged} walletProvider={walletProvider} />
        </section>
    )
}