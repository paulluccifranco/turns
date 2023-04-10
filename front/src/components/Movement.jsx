import ShiftContext from '../contexts/ShiftContext';
import React, { useEffect, useState, useContext } from 'react'
import { url } from '../helpers/api';
import styles from '../assets/Movements.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Movement() {

    const shift = useContext(ShiftContext);
    const [movements, setMovements] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const negativeAmount = { color: 'red' };
    const positiveAmount = { color: 'green' };

    useEffect(() => {
        getShiftMovements();
    }, []);

    const getShiftMovements = () => {
        const shiftId = shift.id;
        fetch(`${url}/movement/${shiftId}`)
            .then(response => response.json())
            .then(data => setMovements(data))
            .catch(error => console.log(error));
    }

    function saveMovement() {
        if (!description) {
            NotificationManager.error('La descripción no puede estar vacía', 'Error al Agregar Importe', 2000);
            return;
        }
        if (!amount) {
            NotificationManager.error('Debe indicar un importe', 'Error al Agregar Importe', 2000);
            return;
        }
        const shiftId = shift.id;
        const data = { shiftId, description, amount };
        fetch(`${url}/movement`, {
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
            .finally(() => {clearFields();getShiftMovements()});
    };

    function getTotals() {
        let total = 0;
        movements.map(mov => {
            total = Number(total) + Number(mov.amount);
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
            <h1>Movimientos</h1>
            <div className={styles.currentAccountContainer}>
            <form className={styles.form}>
                <label htmlFor="description">Description del producto:</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                <label htmlFor="price">Precio del producto:</label>
                <input type="number" id="price" value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />
                <button type="button" onClick={saveMovement}>Agregar Importe</button>
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
                        {Array.from(movements).map((mov, index) => (
                            <tr key={index}>
                                <td>{mov.description}</td>
                                <td style={mov.amount < 0 ? negativeAmount : positiveAmount}>${mov.amount}</td>
                                <td>{mov.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}