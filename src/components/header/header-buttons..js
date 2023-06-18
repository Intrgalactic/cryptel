import { auth } from "firebase.js";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "context/authContext";
import { useContext } from "react";
import { WalletProviderContext } from "context/walletProviderContext";

export function HeaderButtons() {
    const isLogged = useContext(AuthContext);
    const walletContext = useContext(WalletProviderContext);
    return (
        <>
            <Link to={isLogged === true ? '/dashboard' : '/login'}><button className="header-btn">{isLogged === true ? 'Dashboard' : 'Login'}</button></Link>
            {isLogged === false ? <Link to='/sign-up'><button className="header-btn">Sign up</button></Link> : <Link><button className="header-btn" onClick={() => { signOut(auth) }}>Log Out</button></Link>}
            {walletContext.isProviderAvailable === true ? (typeof(walletContext.wallet) === 'undefined' ? <Link><button onClick={() => {walletContext.connectWallet(walletContext.setWallet)}}>Connect</button></Link> : null) : null}
        </>
    )
}