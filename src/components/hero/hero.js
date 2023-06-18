
import { HeroDescription } from "./hero-description";
import { HeroImage } from "./hero-image";


export function Hero() {
    return (
        <section id="hero">
            <HeroDescription/>
            <HeroImage/>
        </section>
    )
}