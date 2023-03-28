import React, { useEffect, useState } from 'react'
import { url } from '../helpers/api';
import styles from '../assets/Horario.module.css';

export function Sells(props) {

    const [dailySells, setDailySells] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [units, setUnits] = useState('');
    const [shouldFocus, setShouldFocus] = useState(true);
    const [optionList, setOptionList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        handleProductList();
        getDailySell();
    }, []);


    function handleInputChange(event) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, "");
        setUnits(newValue);
    }

    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleParticipantSelect = (participant) => {
        setOptionList([]);
        setSearchValue('');
        setSelectedProduct(participant);
    }

    const handleProductList = () => {
        fetch(`${url}/product`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }

    const getDailySell = () => {
        const id = props.turnId;
        fetch(`${url}/daily-sell/turn/${id}`)
            .then(response => response.json())
            .then(data => setDailySells(data))
            .catch(error => console.log(error));
    }

    const saveDailySell = (event) => {
        event.preventDefault();
        const turnId = props.turnId;
        const productId = 2;
        const description = "Elpepe";
        const units = 2;
        const productPrice = 180.50;
        const data = { turnId, productId, description, units, productPrice };
        fetch(`${url}/daily-sell`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
            .finally(() => cleanSell());
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value.length >= 1) {
            setOptionList(products.filter(option => compareProduct(option, e.target.value)));
        } else {
            setOptionList([]);
        }
        console.log(products);
        console.log(optionList);
    }

    const compareProduct = (obj, str) => {
        console.log(obj);
        console.log(str);
        return obj.description.toLowerCase().includes(str.toLowerCase());
    }

    function cleanSell() {
        setCode('');
        setSearchTerm('');
        setUnits('');
    }

    return (
        <>
            <div className={styles.sells}>
                <h1>Venta</h1>
                <form>
                    <label >Codigo:</label>
                    <input autoFocus={!shouldFocus} type="text" value={code} onChange={(event) => setCode(event.target.value)} />
                    <label>Nombre:</label>
                    <input type="text" value={searchValue} onChange={handleSearchChange} />
                    {
                        !!optionList.length && (
                            <div className={styles.optionsContainer}>
                                {
                                    optionList.map(option => (
                                        <div className={styles.optionItem} key={option.id} onClick={() => handleParticipantSelect(option)}>
                                            <span>
                                                {option.description}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }


                    <label>Cantidad:</label>
                    <input type="text" value={units} onChange={handleInputChange} />
                    <div className='button-container'>
                        <button type="button" onClick={saveDailySell}>Guardar</button>
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


        </>

    )
}