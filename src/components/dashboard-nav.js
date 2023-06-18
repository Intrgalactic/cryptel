import { Link } from "react-router-dom"
import logo from 'assets/images/logo.png';
import { logOut } from "utils/utilities.js";

export function DashboardNav({wallet,redirect}) {
    return (
        <nav id="dashboard-navigation">
            <Link to='/dashboard'><img src={logo} /></Link>
            {typeof(wallet) !== 'undefined' ?<Link to={`/${redirect}`}>{redirect}</Link> : null}
            <Link to='/market'>Market</Link>
            <Link to='/launchpad'>Launchpad</Link>
            <Link to='/settings'>Settings</Link>
            <Link onClick={logOut}>Log Out</Link>
        </nav>
    )
}