import React, { useState } from 'react';
import '../assets/Menu.css';
import logo from '../images/Logo.png';
import ListadoTurnos from './ListadoTurnos';
import ListadoFijos from './ListadoFijos';

function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [pantallaActual, setPantallaActual] = useState("Turnos");

  const cambiarPantalla = (pantalla) => {
    setShowMenu(!showMenu);
    setPantallaActual(pantalla);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
    <div className="menu-container">
        <img className="logo" src={logo} onClick={toggleMenu}/>
      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li><button onClick={() => cambiarPantalla("Turnos")}>Turnos</button></li>
            <li><button onClick={() => cambiarPantalla("TurnosFijos")}>Turnos Fijos</button></li>
          </ul>
        </div>
      )}
    </div>
    {pantallaActual === "Turnos" && <ListadoTurnos />}
    {pantallaActual === "TurnosFijos" && <ListadoFijos />}
    </>
  );
}
export default Menu;