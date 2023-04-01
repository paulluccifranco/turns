import React, { useEffect, useState, useRef } from 'react'
import { url } from '../helpers/api';
import styles from '../assets/HistorySells.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function HistorySells() {

    const [sells, setSells] = useState([]);

    useEffect(() => {
        loadSells();
    }, []);


    const loadSells = () => {
        fetch(`${url}/sells`)
            .then(response => response.json())
            .then(data => setSells(data))
            .catch(error => console.log(error));
    }


    function getTotals() {
        var total = 0;
        sells.map(dailySell => {
            var productTotal = dailySell.units * dailySell.productPrice;
            total = total + productTotal;
        });
        return total;
    }


    return (
        <>
            <div className={styles.sellsFrame}>
                <NotificationContainer />
                <h1>Venta</h1>
                <div className={styles.sellsList}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Description</th>
                                <th style={{ width: '10%' }}>Unidades</th>
                                <th style={{ width: '15%' }}>Precio</th>
                                <th style={{ width: '20%' }}>Total</th>
                                <th style={{ width: '30%' }}>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TOTAL:</td>
                                <td>---</td>
                                <td>---</td>
                                <td>${getTotals()}</td>
                                <td></td>
                            </tr>
                            {Array.from(sells).map((sell) => (
                                <tr>
                                    <td>{sell.description}</td>
                                    <td>{sell.units}</td>
                                    <td>${sell.productPrice}</td>
                                    <td>${sell.units * sell.productPrice}</td>
                                    <td>{sell.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>

    )
}
export default HistorySells;