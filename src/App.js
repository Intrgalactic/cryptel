
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NotFound from 'pages/not-found';
import SignUp from 'pages/sign-up';
import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import Settings from 'pages/settings';
import Wallet from 'pages/wallet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase.js';
import { detectProvider, refreshChain, refreshAccounts, connectWallet } from 'utils/utilities';
import Swap from 'pages/swap';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProviderAvailable, setIsProviderAvailable] = useState(false);
  const [isLogged, setIsLogged] = useState();
  const [wallet, setWallet] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);

      }
      else {
        setIsLogged(false);

      }
    });

    new Promise(async (res) => {
      await detectProvider(setIsProviderAvailable, setWallet);
      res(true);
    }).then(() => {
      if (location.pathname === "/Wallet") {
        if (typeof (wallet) === "undefined") {
          navigate('/dashboard');
        }

      }
    });
    if (isLoaded) {
      const style = document.createElement("style");
      const styleElem = document.head.appendChild(style);
  
      setTimeout(() => {
        styleElem.innerHTML = "#home:after,#swap:after {opacity: 0;}";
        styleElem.innerHTML += ".loader {opacity: 0;}";
        setTimeout(() => {
          styleElem.innerHTML = "#home:after,#swap:after {display: none;}";
          styleElem.innerHTML += ".loader {display:none}";
        }, 300);
      }, 500);
    }
    return () => {
      setIsLoaded(true);
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    }
  },[])
  return (
    <Routes>
      <Route path='/' element={<Home isProviderAvailable={isProviderAvailable} wallet={wallet} isLogged={isLogged} connectWallet={connectWallet} setWallet={setWallet}/>} exact />
      <Route path='/login' element={<Login isLogged={isLogged} />} exact />
      <Route path='/sign-up' element={<SignUp isLogged={isLogged} />} exact />
      <Route path='/dashboard' element={<Dashboard wallet={wallet} />} exact />
      <Route path='*' element={<NotFound />} exact />
      <Route path='/settings' element={<Settings />} exact />
      <Route path='/wallet' element={<Wallet wallet={wallet} setWallet={setWallet} setIsProviderAvailable={setIsProviderAvailable} />} exact />
      <Route path='/swap' element={<Swap wallet={wallet} connectWallet={connectWallet} setWallet={setWallet} isProviderAvailable={isProviderAvailable} isLogged={isLogged}/>} exact/>
    </Routes>
  );
}

export default App;
