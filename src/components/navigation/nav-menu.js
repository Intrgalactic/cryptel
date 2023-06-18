import { Link } from "react-router-dom";
import { HeaderButtons } from "../header/header-buttons.";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export function NavMenu() {
    const navRef = useRef();
    const path = useLocation().pathname;
    function toggleNavigation() {
        navRef.current.classList.toggle('open');
        if (path === '/swap') {
            document.querySelector("#swap-section").classList.toggle("nav-opened");
        } 
        else if (document.querySelector("#hero")) {

            document.querySelector("#hero").classList.toggle("nav-opened");
        }
    }
    return (
        <div className="nav-menu" ref={navRef} onClick={() => toggleNavigation()}>
            <div className="bar-1"></div>
            <div className="bar-2"></div>
            <div className="bar-3"></div>
            <div className="navigation-links">
                <Link to='/'>Home</Link>
                <Link to='/invest'>Invest</Link>
        
                <div className="nav-buttons">
                    <HeaderButtons />
                </div>
            </div>
        </div>
    )
}