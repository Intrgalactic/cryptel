import { DashboardNav } from "components/dashboard-nav";
import user from 'assets/images/user-data-image.png';
import { auth } from "firebase.js";
import { onAuthStateChanged, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useReducer } from "react";
import { settingsReducer } from "utils/utilities";

export default function Settings() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userEmail: '',
        userName: '',
        userLastName: '',
        userDOB: '',
        userID: '',
    });
    const [password, setPassword] = useState('');
    const [reAuthenticate, setReAuthenticate] = useState(false);
    const reauthenticateErr = useRef('');
    const userDataContainer = useRef('');
    console.log(userData);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetch(`https://cryptel-990b59aa4ff1.herokuapp.com/user?uid=${user.uid}`).then((res) => res.json()).then(data => {
                    setUserData({
                        userEmail: user.email,
                        userName: data.name,
                        userLastName: data.lastname,
                        userDOB: data.date,
                        userID: user.uid,
                    })

                }).catch(err => {
                    console.log(err);
                })
            }
            else {
                navigate('/');
            }
        });
    }, [navigate]);
    async function deleteUserAccount() {
        const credentials = EmailAuthProvider.credential(
            userData.userEmail,
            password
        )
        reauthenticateWithCredential(auth.currentUser, credentials).then(async (user) => {
            deleteUser(auth.currentUser);
            const res = await fetch(`https://cryptel-990b59aa4ff1.herokuapp.com/delete-user?uid=${encodeURIComponent(userData.uid)}`);
            if (res.ok) {
                navigate('/');
            }
        }).catch((error) => {
            switch (error.code) {
                case "auth/wrong-password": reauthenticateErr.current.innerHTML = `Wrong Password`;
                    break;
                case "auth/too-many-requests": reauthenticateErr.current.innerHTML = "Too Many Requests";
                    break;
                case "auth/missing-password": reauthenticateErr.current.innerHTML = "Missing Password";
                    break;
                default: reauthenticateErr.current.innerHTML = `${error.code}`;
            }
        });
    }
    function reAuthenticatePrompt() {
        setReAuthenticate(true);
        userDataContainer.current.style.filter = "blur(5px)"
    }
    return (
        <main id="settings">
            <DashboardNav wallet={true} redirect="Dashboard" />
            <div id="user-data-container">
                <div className="user-data-box" ref={userDataContainer} style={{ filter: "blur(0px)" }}>
                    <img src={user} alt="user" />
                    <h1>User Email: {userData.userEmail}</h1>
                    <p>Full Name: {userData.userName} {userData.userLastName}</p>
                    <p>Date Of Birth: {userData.userDOB}</p>
                    <button onClick={reAuthenticatePrompt}>Delete Account</button>
                    <p>Clicking the button will delete Your Account.In some cases, we will be unable to delete your account, such as if there is an issue with your account related to trust, safety, or fraud. When we delete your account, we may retain certain information for legitimate business purposes or to comply with legal or regulatory obligations.</p>
                </div>
            </div>
            {reAuthenticate === true ?
                <div id="reauthenticate-prompt">
                    <h1>Please re-enter your password</h1>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                    <p ref={reauthenticateErr}></p>
                    <button onClick={deleteUserAccount}>SUBMIT</button>
                    <button onClick={() => {
                        setReAuthenticate(false);
                        userDataContainer.current.style.filter = "blur(0px)";
                    }}>Cancel</button>
                </div>
                : null}
        </main>
    )
}