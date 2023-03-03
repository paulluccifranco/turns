import React, { useState } from 'react'

import styles from '../assets/Horario.module.css';

export function Horario(props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [stateId, setStateId] = useState('');

    function openModal(){
        setDni(props.hora.dni);
        setName(props.hora.name);
        setStateId(props.hora.stateId);
        setShowModal(true);
    }

    const stateStyle = (state) => {
        if(state === 1){
            return '#fff';
        }
        if(state === 2){
            return '#E5EA4A';
        }
        if(state === 3){
            return '#4ABEEA';
        }
        if(state === 4){
            return 'red';
        }
        if(state === 5){
            return 'green';
        }
    }


    const handleSubmit = (event) => {

        event.preventDefault();
        const id = props.hora.id;
        const field = props.hora.field;
        const hour = props.hora.hour;
        const day = props.hora.day;
        const data = { name, dni, id, field, hour, day, stateId };
        fetch('http://172.18.0.1:8080/turns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error)).finally(() => props.handleCalendarClick(props.hora.day));
        setShowModal(false);
        
    };

    const handleDelete = (event) => {
        event.preventDefault();
        fetch(`http://172.18.0.1:8080/turns/${props.hora.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el turno');
                }
                console.log('El turno ha sido eliminado correctamente');
            })
            .catch(error => {
                console.error('Error:', error);
            }).finally(() => props.handleCalendarClick(props.hora.day));
        setShowModal(false);
        
    };

    return (
        <>
            <div className="turn" style={{ backgroundColor: stateStyle(props.hora.stateId) }} onClick={() => openModal()}>
                {props.hora.name || '---'}
            </div>

            {
                showModal && (
                    <div className={styles.modalContainer}>
                        <div className={styles.modal}>
                            <form>
                                <label>Nombre:</label>
                                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                <label>DNI:</label>
                                <input type="text" value={dni} onChange={(event) => setDni(event.target.value)} />
                                <select value={stateId} onChange={e => setStateId(e.target.value)}>
                                    <option value="1">Por Jugar</option>
                                    <option value="2">Jugando</option>
                                    <option value="3">Terminado</option>
                                    <option value="4">Falto</option>
                                    <option value="5">Pago</option>
                                </select>
                                <button type="submit" onClick={handleDelete}>Borrar</button>
                                <button type="submit" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" onClick={handleSubmit}>Guardar</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}