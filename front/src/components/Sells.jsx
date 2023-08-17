import React, { useEffect, useState, useRef } from 'react'
import { url } from '../services/api';
import styles from '../assets/Sells.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export function Sells(props) {

    const [dailySells, setDailySells] = useState([]);
    const [products, setProducts] = useState([]);
    const [code, setCode] = useState('');
    const [units, setUnits] = useState(1);
    const [shouldFocus, setShouldFocus] = useState(true);
    const [optionList, setOptionList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const inputRef = useRef(null);
    const [paymentMethod, setPaymentMethod] = useState(1);

    useEffect(() => {
        handleProductList();
        getDailySell();
    }, []);


    function handleInputChange(event) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, "");
        setUnits(newValue);
    }

    const handleProductSelect = (product) => {
        setOptionList([]);
        setSearchValue(product.description);
        setSelectedProduct(product);
        setCode(product.code);
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

    function saveDailySell(prod, units) {
        if (prod !== null) {
            const turnId = props.turnId;
            const productId = prod.id;
            const description = prod.description;
            const productPrice = prod.price;
            const data = { turnId, productId, description, units, productPrice };
            fetch(`${url}/daily-sell`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))
                .finally(() => { cleanSell(); getDailySell() });
        } else {
            NotificationManager.error('Producto no Encontrado', 'Producto Inexistente', 2000);
            cleanSell();
        }

    };

    function saveSells() {
        const turnId = props.turnId;
        fetch(`${url}/sells/${turnId}/${paymentMethod}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify('')
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
            .finally(() => { cleanSell(); getDailySell() });

    };

    const handleDelete = (id) => {
        fetch(`${url}/daily-sell/${id}`, {
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
            }).finally(() => { cleanSell(); getDailySell() });

    };

    function substractUnit(dailySell, units) {
        const product = { id: dailySell.productId, description: dailySell.description, price: dailySell.productPrice };
        saveDailySell(product, units);
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value.length >= 1) {
            setOptionList(products.filter(option => compareProduct(option, e.target.value)));
        } else {
            setOptionList([]);
        }
    }

    const compareProduct = (obj, str) => {
        return obj.description.toLowerCase().includes(str.toLowerCase());
    }

    const compareProductCode = (obj, str) => {
        return obj.code === str;
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            const product = products.filter(prod => compareProductCode(prod, code));
            if (product.length) {
                saveDailySell(product[0], units);
            } else {
                NotificationManager.error('Producto no Encontrado', 'Codigo Incorrecto', 2000);
                cleanSell();
            }

        }
    }

    function getTotals() {
        var total = 0;
        dailySells.map(dailySell => {
            var productTotal = dailySell.units * dailySell.productPrice;
            total = total + productTotal;
        });
        return total;
    }

    function cleanSell() {
        setCode('');
        setSelectedProduct(null);
        setSearchValue('');
        setUnits(1);
        inputRef.current.focus();
    }

    return (
        <>
            <div className={styles.sells}>
                <NotificationContainer />
                <h1>Venta</h1>
                <div>
                    <form className={styles.form}>
                        <label >Codigo:</label>
                        <input autoFocus={shouldFocus} type="text" value={code} ref={inputRef} onKeyDown={handleKeyDown} onChange={(event) => setCode(event.target.value)} />
                        <label>Nombre:</label>
                        <input type="text" value={searchValue} onChange={handleSearchChange} />
                        {
                            !!optionList.length && (
                                <div className={styles.optionsContainer}>
                                    {
                                        optionList.map(option => (
                                            <div className={styles.optionItem} key={option.id} onClick={() => handleProductSelect(option)}>
                                                <span>
                                                    {option.description}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                        <label>Precio:</label>
                        <input type="text" value={'$' + (selectedProduct !== null ? selectedProduct.price : '')} disabled={true} />


                        <label>Cantidad:</label>
                        <input type="text" value={units} onChange={handleInputChange} />
                        <div className='button-container'>
                            <button type="button" onClick={() => saveDailySell(selectedProduct, units)}>Guardar</button>
                            <button type="button" onClick={cleanSell}>Borrar</button>
                        </div>
                    </form>
                    <h1>Cola de Ventas</h1>
                    <div className={styles.sellsList}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Description</th>
                                    <th style={{ width: '10%' }}>Unidades</th>
                                    <th style={{ width: '15%' }}>Precio</th>
                                    <th style={{ width: '20%' }}>Total</th>
                                    <th style={{ width: '30%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TOTAL:</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>${getTotals()}</td>
                                    <td>
                                        <button type="button" onClick={() => saveSells()}>CERRAR VENTAS</button>
                                        <div className={styles.selector}>
                                            <label>Forma de Pago:</label>
                                            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                                                <option value="1">Efectivo</option>
                                                <option value="2">Transferencia</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                {Array.from(dailySells).map((dailySell) => (
                                    <tr>
                                        <td>{dailySell.description}</td>
                                        <td>{dailySell.units}</td>
                                        <td>${dailySell.productPrice}</td>
                                        <td>${dailySell.units * dailySell.productPrice}</td>
                                        <td>
                                            <button type="button" onClick={() => substractUnit(dailySell, -1)}>Restar</button>
                                            <button type="button" onClick={() => handleDelete(dailySell.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>

    )
}