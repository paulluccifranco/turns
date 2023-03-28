import React, { useEffect, useState } from 'react'
import {url}  from '../helpers/api';
import styles from '../assets/Horario.module.css';
import { Sells } from './Sells';

export function Horario(props) {

    const horariosCanchas = [
        { value: 1, hora: '07:30' },
        { value: 2, hora: '09:00' },
        { value: 3, hora: '10:30' },
        { value: 4, hora: '12:00' },
        { value: 5, hora: '13:30' },
        { value: 6, hora: '15:00' },
        { value: 7, hora: '16:30' },
        { value: 8, hora: '18:00' },
        { value: 9, hora: '19:30' },
        { value: 10, hora: '21:00' },
        { value: 11, hora: '22:30' },
        { value: 12, hora: '00:00' }
    ];

    const horariosCancha4 = [
        { value: 1, hora: '08:00' },
        { value: 2, hora: '09:30' },
        { value: 3, hora: '11:00' },
        { value: 4, hora: '12:30' },
        { value: 5, hora: '14:00' },
        { value: 6, hora: '15:30' },
        { value: 7, hora: '17:00' },
        { value: 8, hora: '18:30' },
        { value: 9, hora: '20:00' },
        { value: 10, hora: '21:30' },
        { value: 11, hora: '23:00' },
        { value: 12, hora: '00:30' }
    ];


    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [stateId, setStateId] = useState('');
    const [shouldFocus, setShouldFocus] = useState(false);
    


    function openModal() {
        setPhone(props.hora.phone);
        setName(props.hora.name);
        setComment(props.hora.comment);
        setStateId(props.hora.stateId);
        props.hora.id === null ? setShouldFocus(true) : setShouldFocus(false);
        setShowModal(true);
    }

    

    function showHorario(field, hour) {
        let hora = "";
        if (field === 4) {
            hora = horariosCancha4.find((hora) => hora.value === hour);
        } else {
            hora = horariosCanchas.find((hora) => hora.value === hour);
        }

        return hora.hora;
    }

    const stateStyle = (state) => {
        if (state === 1) {
            return '#fff';
        }
        if (state === 2) {
            return '#E5EA4A';
        }
        if (state === 3) {
            return '#4ABEEA';
        }
        if (state === 4) {
            return 'red';
        }
        if (state === 5) {
            return 'green';
        }
    }


    const handleSubmit = (event) => {
        if (name.trim() === "") {
            console.log("entra ca");
        } else {
            event.preventDefault();
            const id = props.hora.id;
            const field = props.hora.field;
            const hour = props.hora.hour;
            const day = new Date(props.hora.day.substring(0,10)+"T00:00:00-03:00");
            const weekDay = props.hora.weekDay;
            const data = { name, phone, comment, id, field, hour, day, stateId, weekDay };
            fetch(`${url}/turns`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error)).finally(() => props.handleCalendarClick(day));
            setShowModal(false);
        }

    };

    

    const handleDelete = (event) => {
        event.preventDefault();
        const day = new Date(props.hora.day.substring(0,10)+"T00:00:00-03:00");
        fetch(`${url}/turns/${props.hora.id}`, {
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
            }).finally(() => props.handleCalendarClick(day));
        setShowModal(false);

    };


    return (
        <>
            <div className="turn" style={{ backgroundColor: stateStyle(props.hora.stateId) }} onClick={() => openModal()}>
                <div style={{ position: 'absolute', marginLeft: 230, marginBottom: 30, fontSize: 11 }}>{props.hora.permanentTurnId === null ? '' : 'Turno Fijo'}</div>
                {props.hora.name || '---'}
            </div>

            {
                showModal && (
                    <div className={styles.modalContainer}>
                        <h6 className={styles.title}> Cancha {props.hora.field}  Horario: {showHorario(props.hora.field, props.hora.hour)} HS</h6>
                        <button type="close" onClick={() => setShowModal(false)}>X</button>
                        <div className={styles.modal}>
                            <div className={styles.form}>
                                <h1>Turno</h1>
                                <form>
                                    <label >Nombre:</label>
                                    <input autoFocus={shouldFocus} required type="text" value={name} onChange={(event) => setName(event.target.value)} onInvalid={F => F.target.setCustomValidity('Debe ingresar un nombre')} />
                                    <label>Telefono:</label>
                                    <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                                    <label>Comentario:</label>
                                    <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
                                    <label>Estado del Turno:</label>
                                    <select className={styles.selector} value={stateId} onChange={e => setStateId(e.target.value)}>
                                        <option value="1">Por Jugar</option>
                                        <option value="2">Jugando</option>
                                        <option value="3">Terminado</option>
                                        <option value="4">Falto</option>
                                        <option value="5">Pago</option>
                                    </select>
                                    <div className='button-container'>
                                        <button type="submit" onClick={handleSubmit}>Guardar</button>
                                        <button type="submit" onClick={handleDelete}>Borrar</button>
                                    </div>
                                </form>
                            </div>
                            <Sells turnId={props.hora.id}></Sells>
                            <div className={styles.currentAccount}>
                                <h1>Cuenta Corriente</h1>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}