import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';
export function SignHeader() {
    return (
        <header id="sign-header">
            <Link to='/'><img src={logo} alt="company logo" /></Link>
        </header>
    )
}