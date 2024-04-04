import React from 'react';
import TableRow from './TableRow';

//styles
import styles from './TabCoin.module.css'
const TableCoin = ({ coins, isLoading,currency ,setChart}) => {
    return (
        
        <div className={styles.container}>
            
            {isLoading ? <div className={styles.loader}>Loading
                <span></span>
            </div> 
            :
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Total Volume</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map(coin =>
                            <TableRow coin={coin} key={coin.id} currency={currency} setChart={setChart} />


                        )}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default TableCoin;