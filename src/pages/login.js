
import { useState } from "react";
import { Benefit } from "components/benefit-box";
import apyRateImage from "assets/images/apy-rate.png";
import investmentImage from 'assets/images/investment.png';
import managementImage from 'assets/images/easy-management.png';
import { BenefitsSection } from "components/benefits-section";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase.js";
import {useNavigate} from 'react-router-dom';
import { SignHeader } from "components/sign-header";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError,setLoginError] = useState();
    const navigate = useNavigate();

    function logIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorMessage = error.message;
                switch(errorMessage) {
                    case "Firebase: Error (auth/wrong-password)." : setLoginError("Wrong password");
                    break;
                    case "Firebase: Error (auth/invalid-email)." : setLoginError("Invalid e-mail");
                    break;
                    case "Firebase: Error (auth/user-not-found)." : setLoginError("User with that e-mail does not exist");
                    break;
                    default : setLoginError("An error occured, please try again.")
                }
            });
    }
    return (
        <main id="sign-page">
            <SignHeader/>
            <section id="form-benefits-section">
                <form>
                    <h1>LOGIN</h1>
                    <label>
                        E-Mail
                    </label>
                    <input type="email" required placeholder="Email" name="email-input" id="email-input" onChange={(e) => { setEmail(e.target.value) }} />
                    <label>
                        Password
                    </label>
                    <input type="password" required placeholder="Password" name="password-input" id="password-input" onChange={(e) => { setPassword(e.target.value) }} />
                    <br/><br/>
                    <p style={{color:"#dc0300",textShadow:"1px 1px 2px black",fontSize:"1.3em"}}>{loginError}</p>
                    <button type="submit" onClick={(e) => {logIn(e)}}>Login</button>
                </form>
                <BenefitsSection>
                    <Benefit type="Flexible APY allocation" image={apyRateImage} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" />
                    <Benefit type="Automated Investments" image={investmentImage} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" />
                    <Benefit type="Easy Management" image={managementImage} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" />
                </BenefitsSection>
            </section>
        </main>
    )
}