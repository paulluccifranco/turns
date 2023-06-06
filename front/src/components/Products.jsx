import React, { useState, useEffect } from 'react'
import { url } from '../helpers/api';
import styles from '../assets/Product.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Products() {

    const [productos, setProductos] = useState([]);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [editStock, setEditStock] = useState("");
    const [newStock, setNewStock] = useState("");
    const [type, setType] = useState('');

    useEffect(() => {
        handleProductList();
    }, []);


    const handleProductList = () => {
        fetch(`${url}/product`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }

    function resetFields() {
        setCode('');
        setDescription('');
        setPrice('');
        setNewStock('');
        setEditStock('');
    }


    const agregarProducto = (event) => {
        event.preventDefault();
        if (!description) {
            NotificationManager.error('La descripción no puede estar vacía', 'Error al Agregar Producto', 2000);
            return;
        }
        if (!code) {
            NotificationManager.error('El codigo no puede estar vacío', 'Error al Agregar Producto', 2000);
            return;
        }
        const stock = 0;
        const data = { description, code, price, stock, type };
        fetch(`${url}/product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 409) {
                    NotificationManager.error('El Codigo ya Existe', 'Error al Agregar Producto', 2000);
                } else {
                    NotificationManager.success('OK', 'Producto Agregado', 2000);
                }
            })
            .catch(error => console.log(error)).finally(() => { handleProductList(); resetFields() });
        setShowModal(false);

    };

    const editProduct = (event) => {
        event.preventDefault();
        const stock = editStock;
        const data = { id, description, code, price, stock, type };
        fetch(`${url}/product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 409) {
                    NotificationManager.error('El Codigo ya Existe', 'Error al Agregar Producto', 2000);
                } else {
                    NotificationManager.success('OK', 'Precio Editado', 2000);
                }
            })
            .catch(error => console.log(error)).finally(() => { handleProductList(); resetFields() });
        setShowEditModal(false);

    };

    const stockActualization = (event) => {
        event.preventDefault();
        const stock = Number(editStock) + Number(newStock);
        const data = { id, description, code, price, stock };
        fetch(`${url}/product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 409) {
                    NotificationManager.error('El Codigo ya Existe', 'Error al Agregar Producto', 2000);
                } else {
                    NotificationManager.success('OK', 'Stock Actualizado', 2000);
                }
            })
            .catch(error => console.log(error)).finally(() => { handleProductList(); resetFields() });
        setShowModal(false);
        setShowEditModal(false);
        setShowStockModal(false);

    };

    function eliminarProducto(id) {
        fetch(`${url}/product/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => console.error(error)).finally(() => { handleProductList(); resetFields() });
    }

    function editarProducto(product) {
        setId(product.id);
        setCode(product.code);
        setDescription(product.description);
        setPrice(product.price);
        setEditStock(product.stock);
        setType(product.type);
        setShowEditModal(true);
    }

    function addStock(product) {
        setId(product.id);
        setCode(product.code);
        setDescription(product.description);
        setPrice(product.price);
        setEditStock(product.stock);
        setType(product.type);
        setShowStockModal(true);
    }

    function handleInputChange(event) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^0-9]/g, "");
        setNewStock(newValue);
    }


    return (
        <>
            <header className="fixed-panel">
                <div>
                    <button type="button" onClick={() => setShowModal(true)} style={{ width: 200, marginLeft: 700, fontWeight: 'bold' }}>Agregar producto</button>
                </div>

            </header>
            <div className={styles.productFrame}>
                <NotificationContainer className="custom-notification-container" />
                <div className={styles.productList}>
                    <h1>Listado de Productos</h1>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Description</th>
                                <th style={{ width: '20%' }}>Código</th>
                                <th style={{ width: '15%' }}>Precio</th>
                                <th style={{ width: '15%' }}>Stock</th>
                                <th style={{ width: '30%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((producto, index) => (
                                <tr key={index}>
                                    <td>{producto.description}</td>
                                    <td>{producto.code}</td>
                                    <td>${producto.price}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <button type="button" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                        <button type="button" onClick={() => editarProducto(producto)}>Editar</button>
                                        <button type="button" onClick={() => addStock(producto)}>Agregar Stock</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <div className={styles.productAdd}>
                            <NotificationContainer className="custom-notification-container" />
                            <h1>Nuevo Producto</h1>
                            <form>
                                <label htmlFor="description">Description del producto:</label>
                                <input type="text" id="description" value={description} autoFocus onChange={(e) => setDescription(e.target.value)} /><br />
                                <label htmlFor="code">Código del producto:</label>
                                <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} /><br />
                                <label htmlFor="price">Precio del producto:</label>
                                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <div className={styles.selector}>
                                    <label>Tipo de Producto:</label>
                                    <select value={type} onChange={e => setType(e.target.value)}>
                                        <option value="1">Otros</option>
                                        <option value="2">Bebidas</option>
                                        <option value="3">Accesorios</option>
                                        <option value="4">Comida</option>
                                    </select>
                                </div>
                                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" onClick={agregarProducto}>Agregar producto</button>
                            </form>
                        </div>
                    </div>

                </div>
            )}
            {showEditModal && (
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <div className={styles.productAdd}>
                            <h1>Editar Producto</h1>
                            <form>
                                <label htmlFor="description">Description del producto:</label>
                                <input type="text" id="description" value={description} disabled /><br />
                                <label htmlFor="code">Código del producto:</label>
                                <input type="text" id="code" value={code} disabled /><br />
                                <label htmlFor="price">Precio del producto:</label>
                                <input type="number" id="price" value={price} autoFocus onChange={(e) => setPrice(e.target.value)} />
                                <div className={styles.selector}>
                                    <label>Tipo de Producto:</label>
                                    <select value={type} onChange={e => setType(e.target.value)}>
                                        <option value="1">Otros</option>
                                        <option value="2">Bebidas</option>
                                        <option value="3">Accesorios</option>
                                        <option value="4">Comida</option>
                                    </select>
                                </div>
                                <button type="button" onClick={() => { setShowEditModal(false); resetFields(); }}>Cancelar</button>
                                <button type="button" onClick={editProduct}>Editar producto</button>
                            </form>
                        </div>
                    </div>

                </div>
            )}
            {showStockModal && (
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <div className={styles.productAdd}>
                            <h1>Cargar Stock</h1>
                            <form>
                                <label htmlFor="description">Description del producto:</label>
                                <input type="text" id="description" value={description} disabled /><br />
                                <label htmlFor="code">Código del producto:</label>
                                <input type="text" id="code" value={code} disabled /><br />
                                <label htmlFor="price">Unidades</label>
                                <input type="number" id="price" value={newStock} autoFocus onChange={handleInputChange} /><br /><br />
                                <button type="button" onClick={() => { setShowStockModal(false); resetFields(); }}>Cancelar</button>
                                <button type="button" onClick={stockActualization}>Agregar Stock</button>
                            </form>
                        </div>
                    </div>

                </div>
            )}

        </>
    );
}

export default Products;