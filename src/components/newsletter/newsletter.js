import { NewsletterForm } from "./newsletter-form";
import newsletterImage from 'assets/images/newsletter-example-image.png';
export function Newsletter() {
    return (
        <section id="newsletter">
            <NewsletterForm/>
            <img src={newsletterImage} alt="newsletter nft"/>
        </section>
    )
}