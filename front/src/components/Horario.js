import React, { useEffect, useState } from 'react'
import {url}  from '../helpers/api';
import styles from '../assets/Horario.module.css';

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

    useEffect(() => {
        handleProductList();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [stateId, setStateId] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [units, setUnits] = useState('');
    const [shouldFocus, setShouldFocus] = useState(false);
    const [dailySells, setDailySells] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };

    function openModal() {
        setPhone(props.hora.phone);
        setName(props.hora.name);
        setComment(props.hora.comment);
        setStateId(props.hora.stateId);
        props.hora.id === null ? setShouldFocus(true) : setShouldFocus(false);
        getDailySell();
        setShowModal(true);
    }

    const handleProductList = () => {
        fetch(`${url}/product`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }

    const getDailySell = () => {
        const id = props.hora.id;
        fetch(`${url}/daily-sell/turn/${id}`)
            .then(response => response.json())
            .then(data => setDailySells(data))
            .catch(error => console.log(error));
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
            const day = props.hora.day;
            const weekDay = props.hora.weekDay;
            const data = { name, phone, comment, id, field, hour, day, stateId, weekDay };
            fetch(`${url}/turns`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error)).finally(() => props.handleCalendarClick(props.hora.day));
            setShowModal(false);
        }

    };

    const saveDailySell = (event) => {
        event.preventDefault();
        const id = props.hora.id;
        const field = props.hora.field;
        const hour = props.hora.hour;
        const day = props.hora.day;
        const weekDay = props.hora.weekDay;
        const data = { name, phone, comment, id, field, hour, day, stateId, weekDay };
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

    function handleInputChange(event) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, "");
        setUnits(newValue);
    }

    function cleanSell() {
        setCode('');
        setDescription('');
        setUnits('');
    }

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
                            <div className={styles.sells}>
                                <h1>Venta</h1>
                                <form>
                                    <label >Codigo:</label>
                                    <input autoFocus={!shouldFocus} type="text" value={code} onChange={(event) => setCode(event.target.value)} />
                                    <label>Nombre:</label>

                                    <input
                                        id="product-search"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchTermChange}
                                        list="product-list"
                                    />
                                    <datalist id="product-list">
                                        {products.map(product => (
                                            <option key={product.id} value={product.description} />
                                        ))}
                                    </datalist>


                                    <label>Cantidad:</label>
                                    <input type="text" value={units} onChange={handleInputChange} />
                                    <div className='button-container'>
                                        <button type="button" onClick={handleSubmit}>Guardar</button>
                                        <button type="button" onClick={cleanSell}>Borrar</button>
                                    </div>
                                </form>
                                <div className={styles.sellsList}>
                                    <h1>Listado de Productos</h1>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '25%' }}>Description</th>
                                                <th style={{ width: '40%' }}>Unidades</th>
                                                <th style={{ width: '5%' }}>Precio</th>
                                                <th style={{ width: '30%' }}>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from(dailySells).map((dailySell) => (
                                                <tr>
                                                    <td>{dailySell.description}</td>
                                                    <td>{dailySell.units}</td>
                                                    <td>{dailySell.productPrice}</td>
                                                    <td>
                                                        <button type="button">Editar</button>
                                                        <button type="button">Restar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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