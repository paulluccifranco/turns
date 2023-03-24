import React, { useState, useEffect } from 'react'
import {url} from '../helpers/api';
import styles from '../assets/Product.module.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Products() {

    const [productos, setProductos] = useState([]);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleProductList();
      }, []);

    // Estado local para almacenar los valores del formulario
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [price, setPrice] = useState("");

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
    }
    

    const agregarProducto = (event) => {
            event.preventDefault();
            const stock = 0;
            const data = { description, code, price,stock};
            if(description === '') {
                NotificationManager.error('Mensaje de éxito', 'Título de éxito', 1000);
            }
            fetch(`${url}/product`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error)).finally(() => {handleProductList();resetFields()});
                NotificationManager.success('Mensaje de éxito', 'Título de éxito', 1000);

                setShowModal(false);

    };

    function eliminarProducto(id) {
            fetch(`${url}/product/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .catch(error => console.error(error)).finally(() => {handleProductList();resetFields()});
    }

    // Función para eliminar un producto de la lista
    function editarProducto(index) {
        const nuevaLista = [...productos];
        nuevaLista.splice(index, 1);
        setProductos(nuevaLista);
    }




    return (
        <>
            <header className="fixed-panel">
                <div>
                    <h1 style={{ width: 200, marginLeft: 700, fontWeight: 'bold' }}>Productos</h1>
                </div>
                <NotificationContainer />
            </header>
            <div className={styles.productFrame}>      
                <div className={styles.productList}>
                <h1>Listado de Productos</h1>
                <button type="button" onClick={() => setShowModal(true)}>Agregar producto</button>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Description</th>
                            <th style={{ width: '40%' }}>Código</th>
                            <th style={{ width: '5%' }}>Precio</th>
                            <th style={{ width: '5%' }}>Stock</th>
                            <th style={{ width: '30%' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.description}</td>
                                <td>{producto.code}</td>
                                <td>{producto.price}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <button type="button" onClick={() => editarProducto(index)}>Editar</button>
                                    <button type="button" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className={styles.productStock}>
                <h1>Resumen de Ventas</h1>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Description</th>
                            <th style={{ width: '45%' }}>Código</th>
                            <th style={{ width: '5%' }}>Precio</th>
                            <th style={{ width: '30%' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.description}</td>
                                <td>{producto.code}</td>
                                <td>{producto.price}</td>
                                <td>
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
                <h1>Nuevo Producto</h1>
                <form>
                    <label htmlFor="description">Description del producto:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                    <label htmlFor="code">Código del producto:</label>
                    <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} /><br />
                    <label htmlFor="price">Precio del producto:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />
                    <button type="button" onClick={agregarProducto}>Agregar producto</button>
                </form>
                </div>          
                    </div>

                </div>
            )}

        </>
    );
}

export default Products;