import React, { useState } from 'react'
import url from '../helpers/api';
import styles from '../assets/Horario.module.css';

export function HorarioFijo(props) {
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
    const [superposedTurns, setSuperposedTurns] = useState([]);

    function openModal() {
        setPhone(props.hora.phone);
        setName(props.hora.name);
        setComment(props.hora.comment);
        setShowModal(true);
    }

    function showHorario(field, hour){
        let hora = "";
        if(field === 4){
            hora = horariosCancha4.find((hora) => hora.value === hour);
        }else {
            hora = horariosCanchas.find((hora) => hora.value === hour);
        }

        return hora.hora;
    }

    const handleSubmit = (event) => {
        if (name.trim() == "") {
            console.log("entra ca");
        } else {
            event.preventDefault();
            const id = props.hora.id;
            const field = props.hora.field;
            const hour = props.hora.hour;
            const day = props.hora.day;
            const data = { name, phone, comment, id, field, hour, day };
            fetch(`${url}/permanent-turns`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => setSuperposedTurns(data))
                .catch(error => console.error(error)).finally(() => props.handleCalendarClick(props.hora.day));
            setShowModal(false);
        }
    };

    const handleDelete = (event) => {
        event.preventDefault();
        fetch(`${url}/permanent-turns/${props.hora.id}`, {
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
            <div className="turn" style={{ backgroundColor: 'white' }} onClick={() => openModal()}>
                {props.hora.name || '---'}
            </div>

            {
                showModal && (
                    <div className={styles.modalContainer}>
                        <div className={styles.modal}>
                            <span> Cancha {props.hora.field}  Horario: {showHorario(props.hora.field, props.hora.hour)}</span>
                            <form>
                                <label>Nombre:</label>
                                <input autoFocus required type="text" value={name} onChange={(event) => setName(event.target.value)} onInvalid={F => F.target.setCustomValidity('Debe ingresar un nombre')}  />
                                <label>Telefono:</label>
                                <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                                <label>Comentario:</label>
                                <input type="textarea" value={comment} onChange={(event) => setComment(event.target.value)} />
                                <button type="submit" onClick={handleSubmit}>Guardar</button>
                                <button type="submit" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" onClick={handleDelete}>Borrar</button>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                superposedTurns && superposedTurns.length > 0 && (
                    <div className={styles.modalContainer}>
                        <div className={styles.modal}>
                            <form style={{ textAlign: "left" }}>
                                <span>El turno no podra jugar en las siguientes fechas ya que se encuentrar turnos ocupados: </span>
                                <ul>
                                    {superposedTurns.map((turn) =>
                                        <li>
                                            <span>El dia: </span><span>{turn.day.substring(0, 10)} a nombre de {turn.name}</span>
                                        </li>
                                    )}

                                </ul>
                                <button type="submit" onClick={() => setSuperposedTurns([])}>Aceptar</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}