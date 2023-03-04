import React, { useEffect, useState } from 'react';
import './assets/styles.css';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/dist/rsuite.min.css';
import ListadoHorarios from './components/ListadoHorarios';
import ListadoCancha from './components/ListadoCancha';
import logo from './images/Logo.png';


function App() {

  const [data, setData] = useState([]);

  const handleCalendarClick = (date) => {
    fetch(`http://172.18.0.1:8080/turns/${date}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }


  return (
    <div>
        <header className="fixed-panel">
      <div>
        <img className="logo" src={logo} />
        <DatePicker oneTap style={{ width: 200, marginLeft: 700 } } onSelect={handleCalendarClick}/>
      </div>
        <div>
          <div className="cancha">Horarios</div>
          <div className="cancha">Cancha 1</div>
          <div className="cancha">Cancha 2</div>
          <div className="cancha">Cancha 3</div>
          <div className="cancha">Cancha 4</div>
        </div>
      </header>
      {data && (
      <div className='separate'>
      
        {/* {
          data.map(turno => (
            <ListadoCancha turnos={cancha.turnos} />
            ))
          } */}

        <ListadoHorarios></ListadoHorarios>
        <ListadoCancha turnos={data.filter(turno => turno.field === 1)} handleCalendarClick={handleCalendarClick} />
        <ListadoCancha turnos={data.filter(turno => turno.field === 2)} handleCalendarClick={handleCalendarClick}/>
        <ListadoCancha turnos={data.filter(turno => turno.field === 3)} handleCalendarClick={handleCalendarClick}/>
        <ListadoCancha turnos={data.filter(turno => turno.field === 4)} handleCalendarClick={handleCalendarClick}/>
      </div>
      )}
    </div>
  );
}
export default App;