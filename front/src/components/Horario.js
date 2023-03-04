import React, { useState } from 'react'
import url from '../helpers/api';
import styles from '../assets/Horario.module.css';

export function Horario(props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [stateId, setStateId] = useState('');

    function openModal(){
        setPhone(props.hora.phone);
        setName(props.hora.name);
        setComment(props.hora.comment);
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
        console.log(url)

        event.preventDefault();
        const id = props.hora.id;
        const field = props.hora.field;
        const hour = props.hora.hour;
        const day = props.hora.day;
        const data = { name, phone, comment, id, field, hour, day, stateId };
        fetch(`${url}/turns`, {
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
                                <label >Nombre:</label>
                                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                <label>Telefono:</label>
                                <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                                <label>Comentario:</label>
                                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                                <select value={stateId} onChange={e => setStateId(e.target.value)}>
                                    <option value="1">Por Jugar</option>
                                    <option value="2">Jugando</option>
                                    <option value="3">Terminado</option>
                                    <option value="4">Falto</option>
                                    <option value="5">Pago</option>
                                </select>
                                <button type="submit" onClick={handleSubmit}>Guardar</button>
                                <button type="submit" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" onClick={handleDelete}>Borrar</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}