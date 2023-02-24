import React from 'react';
import './assets/styles.css';
import FixedPanel from './template/FixedPanel';
import ListadoHorarios from './components/ListadoHorarios';
import ListadoCancha1 from './components/ListadoCancha1';
import ListadoCancha2 from './components/ListadoCancha2';
import ListadoCancha3 from './components/ListadoCancha3';

function App() {

  return (
    <div>
      <FixedPanel></FixedPanel>
      <div className='separate'>
      <ListadoHorarios></ListadoHorarios>
      <ListadoCancha1></ListadoCancha1>
      <ListadoCancha2></ListadoCancha2>
      <ListadoCancha3></ListadoCancha3>
      </div>
    </div>
  );
}
export default App;