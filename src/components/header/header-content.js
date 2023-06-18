import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';
import { NavMenu } from 'components/navigation/nav-menu';
import { HeaderButtons } from './header-buttons.';

export function HeaderContent() {
    return (
        <section id="header-content">
            <img src={logo} alt="logo" className="logo"></img>
            <NavMenu />
            <Link to='/'>Home</Link>
            <Link to='/sign-up'>Invest</Link>
            <HeaderButtons/>
        </section>
    )
}