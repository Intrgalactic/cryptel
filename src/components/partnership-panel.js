import coindesk from 'assets/images/partner-image-3.png';
import coinmarketcap from 'assets/images/partner-image-2.png';
import coingecko from 'assets/images/partner-image-1.png';

export function PartnershipPanel () {
    return (
        <section id="partnership-panel">
            <img src={coindesk} alt="coindesk logo"/>
            <img src={coinmarketcap} alt="coinmarketcap logo"/>
            <img src={coingecko} alt="coingecko logo"/>
        </section>
    )
}