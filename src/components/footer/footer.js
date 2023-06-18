import logo from 'assets/images/logo.png';
import { FooterPagesSection } from './footer-pages-section';

export function Footer() {
    return (
        <footer>
            <img src={logo} alt="logo"/>    
            <section id="footer-pages">
                <FooterPagesSection/>
                <FooterPagesSection/>    
                <FooterPagesSection/>        
            </section>        
        </footer>
    )
}