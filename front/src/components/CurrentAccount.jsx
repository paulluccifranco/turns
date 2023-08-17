import React, { useEffect, useState, useContext } from 'react'
import { url } from '../services/api';
import styles from '../assets/CurrentAccount.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ShiftContext from '../contexts/ShiftContext';

export function CurrentAccount(props) {

    const shift = useContext(ShiftContext);
    const [currentAccount, setCurrentAccount] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const negativeAmount = { color: 'red' };
    const positiveAmount = { color: 'green' };

    useEffect(() => {
        loadCurrentAccountData();
    }, []);

    const getCurrentAccountByTurn = () => {
        const id = props.turn.id;
        fetch(`${url}/current-account/turn/${id}`)
            .then(response => response.json())
            .then(data => setCurrentAccount(data))
            .catch(error => console.log(error));
    }

    const getCurrentAccountByPermanentTurn = () => {
        const id = props.isPermanent ? props.turn.id : props.turn.permanentTurnId;
        fetch(`${url}/current-account/permanent-turn/${id}`)
            .then(response => response.json())
            .then(data => setCurrentAccount(data))
            .catch(error => console.log(error));
    }

    const loadCurrentAccountData = () => {
        if (props.turn.permanentTurnId === null) {
            getCurrentAccountByTurn();
        } else {
            getCurrentAccountByPermanentTurn();
        }
    }

    function saveCurrentAccount() {
        if (!description) {
            NotificationManager.error('La descripción no puede estar vacía', 'Error al Agregar Importe', 2000);
            return;
        }
        if (!amount) {
            NotificationManager.error('Debe indicar un importe', 'Error al Agregar Importe', 2000);
            return;
        }
        console.log(props.turn);
        const permanentTurnId = props.isPermanent ? props.turn.id : props.turn.permanentTurnId;
        const turnId = props.turn.id;
        const shiftId = shift.id;
        const data = { permanentTurnId, turnId, description, amount, shiftId };
        console.log(data);
        fetch(`${url}/current-account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
            .finally(() => {clearFields();loadCurrentAccountData()});
    };

    function getTotals() {
        let total = 0;
        currentAccount.map(currAcc => {
            total = Number(total) + Number(currAcc.amount);
        });
        return total;
    }

    const clearFields = () => {
        setDescription('');
        setAmount('');
    }


    return (
        <>
            <NotificationContainer className="custom-notification-container" />
            <h1>Cuenta Corriente</h1>
            <div className={styles.currentAccountContainer}>
            <form className={styles.form}>
                <label htmlFor="description">Description del producto:</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                <label htmlFor="price">Precio del producto:</label>
                <input type="number" id="price" value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />
                <button type="button" onClick={saveCurrentAccount}>Agregar Importe</button>
            </form>
            <div className={styles.currentAccountList}>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Descripcion</th>
                            <th style={{ width: '30%' }}>Importe</th>
                            <th style={{ width: '30%' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>TOTAL:</td>
                            <td style={getTotals() < 0 ? negativeAmount : positiveAmount}>${getTotals()}</td>
                            <td>---</td>
                        </tr>
                        {Array.from(currentAccount).map((currAcc, index) => (
                            <tr key={index}>
                                <td>{currAcc.description}</td>
                                <td style={currAcc.amount < 0 ? negativeAmount : positiveAmount}>${currAcc.amount}</td>
                                <td>{currAcc.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}