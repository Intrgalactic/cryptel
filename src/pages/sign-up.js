import { useState } from "react";
import { Benefit } from "components/benefit-box";
import apyRateImage from "assets/images/apy-rate.png";
import investmentImage from 'assets/images/investment.png';
import managementImage from 'assets/images/easy-management.png';
import { BenefitsSection } from "components/benefits-section";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase.js";
import { useNavigate } from "react-router-dom";
import { SignHeader } from "components/sign-header";


export default function SignUp({isLogged}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');
    const [validateErr, setValidateErr] = useState('');
    const [firebaseError,setFirebaseError] = useState();
    const dateReg = new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/);
    const emailReg = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    const navigate = useNavigate();
    if (isLogged) {
        navigate('/dashboard');
    }
    function validate() { 
        const dateArr = date.split('-');
        const userCredentials = {
            Name: name,
            LastName: lastName,
            Email: email,
            Password: password,
            Date: date
        }
        for (const [key, value] of Object.entries(userCredentials)) {
            if (value === "") {
                setValidateErr(`Empty ${key}`);
                return false;
            }
        }
        if (!dateReg.test(date)) {
            setValidateErr('Invalid age');
            return false;
        }
        if (dateArr[0] > 2005 || dateArr[0] < 1920) {
            setValidateErr('Invalid age');
            return false;
        }
        if (!emailReg.test(email)) {
            setValidateErr("Invalid email format");
            return false;
        }
        setValidateErr('');
        return true;
    }
    function create(e) {
        e.preventDefault();
        if (validate()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (result) => {
                    const res = await fetch(`https://cryptel-990b59aa4ff1.herokuapp.com/create-user?uid=${result.user.uid}&name=${name}&lastName=${lastName}&dateOfBirth=${date}`);
                    if (res.ok) {
                        navigate('/dashboard');
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message
                    switch(errorMessage) {
                        case "Firebase: Error (auth/wrong-password)." : setFirebaseError("Wrong password");
                        break;
                        case "Firebase: Error (auth/invalid-email)." : setFirebaseError("Invalid e-mail");
                        break;
                        case "Firebase: Error (auth/user-not-found)." : setFirebaseError("User with that e-mail does not exist");
                        break;
                        case "Firebase: Password should be at least 6 characters (auth/weak-password)." : setFirebaseError("The password is too weak (insert atleast 6 characters)");
                        break;
                        default : setFirebaseError("An error occured, please try again.")
                    }
                })
        }
    }
    return (
        <main id="sign-page">
            <SignHeader />
            <section id="form-benefits-section">
                <form>
                    <h1>SIGN UP</h1>
                    <label for="name-input">
                        Your Name
                    </label>
                    <input type="text" required placeholder="Name" name="name-input" id="name-input" onChange={(e) => setName(e.target.value)} />
                    <label for="lastname-input">
                        Your Lastname
                    </label>
                    <input type="text" required placeholder="Lastname" name="lastname-input" id="lastname-input" onChange={((e) => setLastName(e.target.value))} />
                    <label for="email-input">
                        Your E-Mail
                    </label>
                    <input type="email" required placeholder="Email" name="email-input" id="email-input" onChange={(e) => setEmail(e.target.value)} />
                    <label for="password-input">
                        Password
                    </label>
                    <input type="password" required placeholder="Password" name="password-input" id="password-input" onChange={(e) => setPassword(e.target.value)} />
                    <label for="date-of-birth">
                        Your Date Of Birth
                    </label>
                    <input type="date" required max="2005-06-09" name="date-of-birth" id="date-of-birth" onChange={(e) => setDate(e.target.value)} />
                    <p style={{ color: "#dc0300", textShadow: "1px 1px 2px black", fontSize: "1.3em" }}>{validateErr.length > 0 ? validateErr : firebaseError}</p>
                    <button type="submit" onClick={(e) => create(e)}>Sign Up</button>

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