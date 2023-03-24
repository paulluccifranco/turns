import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import '../assets/Menu.css';
import ListadoTurnos from './ListadoTurnos';
import ListadoFijos from './ListadoFijos';
import Products from './Products';

function LeftPanel() {

const [pantallaActual, setPantallaActual] = useState("Turnos");

  const cambiarPantalla = (pantalla) => {
    setPantallaActual(pantalla);
  };

  const stateStyle = (state) => {
    if (state === pantallaActual) {
        return '#c0d015';
    }
}


  return (
    <>
    <div className='left-panel'>
        <div className='panel-menu'>
        <ul>
        <li onClick={() => cambiarPantalla("Turnos")} style={{backgroundColor: stateStyle("Turnos")}}>Turnos</li>
            <li onClick={() => cambiarPantalla("TurnosFijos")} style={{backgroundColor: stateStyle("TurnosFijos")}}>Turnos Fijos</li>
            <li onClick={() => cambiarPantalla("Products")} style={{backgroundColor: stateStyle("Products")}}>Productos</li>
          </ul>
        </div>
    </div>
    {pantallaActual === "Turnos" && <ListadoTurnos />}
    {pantallaActual === "TurnosFijos" && <ListadoFijos />}
    {pantallaActual === "Products" && <Products />}
    </>
  );    

}
export default LeftPanel;