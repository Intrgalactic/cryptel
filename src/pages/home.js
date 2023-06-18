import { Header } from 'components/header/header';
import { Hero } from 'components/hero/hero';
import 'App.css';
import { PartnershipPanel } from 'components/partnership-panel';
import { AboutUs } from 'components/about-us/about-us';
import { Journey } from 'components/journey/journey';
import { Testimonials } from 'components/testimonial/testimonials';
import { Newsletter } from 'components/newsletter/newsletter';
import { Footer } from 'components/footer/footer';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from 'firebase.js';
import { AuthContext } from 'context/authContext';
import { WalletProviderContext } from 'context/walletProviderContext';
import { Loader } from 'components/loading-circle.js';
export default function Home({ isLogged, wallet, isProviderAvailable, setWallet, connectWallet, isLoaded }) {

  return (
    <div className="App" id="home">
      <AuthContext.Provider value={isLogged}>
        <WalletProviderContext.Provider value={{ wallet: wallet, isProviderAvailable: isProviderAvailable, connectWallet, setWallet }}>
          <Header></Header>
          <Hero />
          <PartnershipPanel />
          <AboutUs />
          <Journey />
          <Testimonials />
          <Newsletter />
          <Footer />
        </WalletProviderContext.Provider>
      </AuthContext.Provider>
      <Loader />
    </div>
  )
}