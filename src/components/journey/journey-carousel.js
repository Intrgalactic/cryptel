import { JourneySelectBox } from "./journey-select-box";
import firstWallet from 'assets/images/cta-example-image-1.png';
import secondWallet from 'assets/images/cta-example-image-2.png';

export function JourneyCarousel({isLogged,walletProvider}) {
    return (
        <section id="journey-carousel">
            {isLogged === false ? <JourneySelectBox heading="Create Wallet" image={firstWallet} button="CREATE" redirect='/sign-up'/> : null}
            {typeof(walletProvider.wallet) === "undefined" ? <JourneySelectBox heading="Connect Wallet" image={secondWallet} button="CONNECT" handleClick={() => { walletProvider.connectWallet(walletProvider.setWallet) }}/> : null}
        </section>
    )
}