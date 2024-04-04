import React, { useState, useEffect } from 'react';
import { searchCoin } from '../../services/CryptoApi';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner'
import styles from './Search.module.css'




const Search = ({ currency, setCurrency }) => {
    const [text, setText] = useState("");
    const [coins, setCoins] = useState([])
    const [isLoadingSearch, setLoadingSearch] = useState(false);
    

    useEffect(() => {
      
        const controller = new AbortController()
     
       
        setCoins([])
        if (!text) {
            setLoadingSearch(false)
            return
        }
        
        const search = async () => {
            try {
                //     const res =await fetch(searchCoin(text),{signal:controller.signal})
                // const json=await res.json();
                const res = await axios.get(searchCoin(text),
                    {
                        signal: controller.signal
                    });
                const json = res.data;
                // console.log(json);
                if (json.coins) {
                    setLoadingSearch(false)
                    setCoins(json.coins)
                }
                else {
                    alert(json.status.error_message)
                    console.log("i cant find coin")

                }
            }
            catch (error) {
                if (error.name !== "AbortError") {
                    toast.error(error.message)
                
                    
                }


            }

        }
        setLoadingSearch(true)
        search()
        return () => controller.abort()
    }, [text])
    return (
        <div className={styles.searchBox}>
            <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
            {/* <ToastContainer position="bottom-right" style={{
                zIndex: 9999, backgroundColor:
                    "red"
            }} /> */}
            <input type="text" placeholder='search' value={text} onChange={e => setText(e.target.value)} />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {(!!coins.length||isLoadingSearch)&&(<div className={styles.searchResult}>
                {isLoadingSearch && <RotatingLines
                    strokeColor="#0066ff"
                    strokeWidth="3"
                    animationDuration="1"
                    width="50"
                    visible={true}
                />
                }

                <ul>
                    {coins.map(coin => <li key={coin.id}><img src={coin.thumb} alt={coin.name} />
                        <p>{coin.name}</p>

                    </li>)}
                </ul>
            </div>)}
        </div>
    );
};

export default Search;



