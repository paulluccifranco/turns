import React, { useState } from 'react';
import '../assets/Menu.css';
import logo from '../images/Logo.png';

function Menu() {


  return (
    <>
    <div className="menu-container">
        <img className="logo" src={logo}/>
    </div>
    </>
  );
}
export default Menu;