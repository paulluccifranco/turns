import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import { CustomProvider, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ListadoHorarios from './ListadoHorarios';
import ListadoCancha from './ListadoCancha';
import ListadoCancha4 from './ListadoCancha4';
import url from '../helpers/api';
import es_AR from 'rsuite/locales/es_AR';


function ListadoTurnos() {

  const [data, setData] = useState([]);

  const handleCalendarClick = (date) => {
    fetch(`${url}/turns/${date}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }


  return (
    <div>
      <header className="fixed-panel">
        <div>
        <span style={{ width: 200, marginLeft: 400, fontWeight: 'bold', fontSize: 20 }}>Listado de Turnos</span>
          <CustomProvider locale={es_AR}>
            <DatePicker oneTap style={{ width: 200, marginLeft: 200 }} onSelect={handleCalendarClick} />
          </CustomProvider>
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
          <ListadoCancha turnos={data.filter(turno => turno.field === 2)} handleCalendarClick={handleCalendarClick} />
          <ListadoCancha turnos={data.filter(turno => turno.field === 3)} handleCalendarClick={handleCalendarClick} />
          <ListadoCancha4 turnos={data.filter(turno => turno.field === 4)} handleCalendarClick={handleCalendarClick} />
        </div>
      )}
    </div>
  );
}
export default ListadoTurnos;