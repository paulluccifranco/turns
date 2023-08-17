import React, { useState, useContext, useEffect } from 'react';
import styles from '../assets/GeneralParameters.module.css';
import { url } from '../services/api';

export default function GeneralParameters() {
    const [showResume, setShowResume] = useState(false);
    const [turnValuesModal, setTurnValuesModal] = useState(false)
    const [turnValues, setTurnValues] = useState('');
    const [parameter, setParameter] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [valuesArray, setValuesArray] = useState([]);

    function showTurnValues() {
        const key = "TURN_VALUES";
        fetch(`${url}/platform-parameter/${key}`)
            .then(response => response.json())
            .then(data => {
                setTurnValues(data.value);
                setParameter(data);
                setValuesArray(data.value.split(','));
            })
            .catch(error => console.log(error))
            .finally(setTurnValuesModal(true));
    }


    const saveValue = () => {
        const newArray = [...valuesArray, newValue];
      //  const updatedParam = turnValues.concat(',', newValue);
        const updatedParam = newArray.join(",");
        saveParameter('TURN_VALUES', updatedParam);
        setTurnValues(updatedParam);
        setValuesArray(newArray);
        setTurnValuesModal(false);
    }

    const removeValue = (value) => {
        const newArray = valuesArray.filter(item => item !== value);
        const updatedParam = newArray.join(",");
        saveParameter('TURN_VALUES', updatedParam);
        setTurnValues(updatedParam);
        setValuesArray(newArray);
        setTurnValuesModal(false);
    }

    const saveParameter = (key, value) => {
        const id = parameter !== null ? parameter.id : null;
        const data = { id, key, value };
        fetch(`${url}/platform-parameter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    };



    return (
        <>
            <div className={styles.generalParametersFrame}>
                <button onClick={() => showTurnValues()}>Precios de Turnos</button>
                <button onClick={() => setShowResume(true)}>Resumen de Ventas</button>
                <button onClick={() => setShowResume(true)}>Seleccionar Productos Para Resumen del Dia</button>
            </div>

            {turnValuesModal && (
                <div className={styles.modalContainer}>
                    <button type="close" onClick={() => setTurnValuesModal(false)}>×</button>
                    <div className={styles.pricesModal}>
                        <form className={styles.turnValuesForm}>
                            <input type="number" id="price" value={newValue} onChange={(e) => setNewValue(e.target.value)} /><br /><br />
                            <button type="button" onClick={saveValue}>Agregar Precio</button>
                        </form>
                        <div className={styles.pricesList}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Precios</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Utiliza el método map() para recorrer el arreglo y generar una fila por cada elemento */}
                                {valuesArray.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value}</td>
                                        <td><button type="button" onClick={() => removeValue(value)}>Eliminar Precio</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}