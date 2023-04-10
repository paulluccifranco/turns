import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import '../assets/Menu.module.css';
import ListadoTurnos from './TurnFrame';
import ListadoFijos from './PermanentTurnFrame';
import Products from './Products';
import HistorySells from './HistorySells';
import Summaries from './Summaries';
import GeneralParameters from './GeneralParameters';

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
            <li onClick={() => cambiarPantalla("Turnos")} style={{ backgroundColor: stateStyle("Turnos") }}>Turnos</li>
            <li onClick={() => cambiarPantalla("TurnosFijos")} style={{ backgroundColor: stateStyle("TurnosFijos") }}>Turnos Fijos</li>
            <li onClick={() => cambiarPantalla("Products")} style={{ backgroundColor: stateStyle("Products") }}>Productos</li>
            <li onClick={() => cambiarPantalla("Ventas")} style={{ backgroundColor: stateStyle("Ventas") }}>Ventas</li>
            <li onClick={() => cambiarPantalla("Parameters")} style={{ backgroundColor: stateStyle("Parameters") }}>Parametros Generales</li>
            <li onClick={() => cambiarPantalla("Resumenes")} style={{ backgroundColor: stateStyle("Resumenes") }}>Resumenes</li>
          </ul>
        </div>
      </div>
      {pantallaActual === "Turnos" && <ListadoTurnos />}
      {pantallaActual === "TurnosFijos" && <ListadoFijos />}
      {pantallaActual === "Products" && <Products />}
      {pantallaActual === "Ventas" && <HistorySells />}
      {pantallaActual === "Resumenes" && <Summaries />}
      {pantallaActual === "Parameters" && <GeneralParameters />}
    </>
  );

}
export default LeftPanel;