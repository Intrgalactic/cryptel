import { auth } from "firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import detectEthereumProvider from "@metamask/detect-provider";


export function getFormattedDates(arr) {
    var start = new Date("12/31/2022");
    var end = new Date("06/10/2023");
    var loop = new Date(start);
    var datesArrCopy = arr;
    while (loop <= end) {
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        var day = loop.getDate();
        var month = loop.getMonth() + 1;
        formatDate(day);
        formatDate(month);
        datesArrCopy.push(`${day}.${month}`);
    }
    return datesArrCopy;
}

export function formatDate(date) {
    if (date < 10) {
        return "0" + date;
    }
}

export function logOut() {
    signOut(auth);
}

export function fetchUrl(url, getData) {
    new Promise(async (resolve, reject) => {
        let res;
        try {
            res = await fetch(url);
        }
        catch (err) {
            console.log("failed to fetch", err);
        }
        if (res.ok) {
            const data = await res.json();
            await getData(data);
            resolve(data);
        }
    })
}

export async function detectProvider(setIsProviderAvailable, setWallet,setProvider,wallet,chainId) {
    const provider = await detectEthereumProvider({ silent: true });
    setIsProviderAvailable(Boolean(provider));
    if (provider) {
        const accounts = await window.ethereum.request(
            { method: "eth_accounts" }
        )
        refreshAccounts(accounts, setWallet);
        window.ethereum.on('accountsChanged', () => {
            refreshAccounts(accounts, setWallet);
        });
        window.ethereum.on("chainChanged", () => {
            refreshChain(chainId,setWallet);
        });
    }
 
}
export async function connectWallet(setWallet) {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    })
    updateWallet(accounts, setWallet);
}
export async function updateWallet(accounts, setWallet) {
    const balance = formatBalance(await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
    }))
    const chainId = await window.ethereum.request({
        method: "eth_chainId",
    })
    setWallet({ accounts,balance,chainId });
}
export async function refreshAccounts(accounts, setWallet) {
    if (accounts.length > 0) {
        updateWallet(accounts, setWallet);
    }
    else {
        setWallet();
    }
}
export const refreshChain = (chainId,setWallet) => {               /* New */
    setWallet((wallet) => ({ ...wallet, chainId }))      /* New */
}
export function formatBalance(rawBalance) {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export function formatChainAsNum(chainIdHex) {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum;
}

export function isAuthenticated(navigate) {
    new Promise(async (resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            }
            else {
                navigate('/');
            }
        })
    });
}
