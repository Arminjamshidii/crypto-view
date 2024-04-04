import React from 'react';
import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"
//styles
import styles from './TabCoin.module.css'
import { marketChart } from '../../services/CryptoApi';
const TableRow = ({coin,currency,setChart}) => {
    const {id,name,image,symbol,current_price,total_volume,price_change_percentage_24h}=coin
    const showHandler = async()=>{
        try {
            const res = await fetch(marketChart(id))
            const json =await res.json()
            setChart({...json, coin:coin});
            console.log(json);
            
        } catch (error) {
            setChart(null)
            
        }
    }
    return (
        <tr >
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt={id} />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td className={styles.price}>{current_price.toLocaleString()} 
              <span>{currency === 'usd' && "$"}</span>
              <span>{currency === 'eur' && "€"}</span>
              <span>{currency === 'jpy' && "¥"}</span>
            </td>
            <td className={price_change_percentage_24h>0?styles.success:styles.error}>{price_change_percentage_24h.toFixed(2)}%</td>
            <td className={styles.total}>{total_volume.toLocaleString()}</td>
            <td ><img className={styles.chartImage} src={price_change_percentage_24h > 0 ? chartUp : chartDown} alt={name} /> </td>
        </tr>
    );
};

export default TableRow;