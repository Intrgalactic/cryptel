import aboutUsImg from 'assets/images/about-us-image.png';
import { AboutUsLiteral } from './about-us-literal';

export function AboutUs() {
    return (
        <section id="about-us">
            <img src={aboutUsImg} alt="about us" />
            <AboutUsLiteral/>
        </section>
    )
}