import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import { CustomProvider, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import HourList from './HourList';
import ListadoCanchaFijo from './PermanentTurnList';
import {url} from '../helpers/api';
import es_AR from 'rsuite/locales/es_AR';
import styles from '../assets/Horario.module.css';


function ListadoFijos() {

  const [data, setData] = useState([]);

  const handleCalendarClick = (date) => {
    fetch(`${url}/permanent-turns/${date}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }

  const weekDays = [
    { label: 'Domingo', value: 1 },
    { label: 'Lunes', value: 2 },
    { label: 'Martes', value: 3 },
    { label: 'Miércoles', value: 4 },
    { label: 'Jueves', value: 5 },
    { label: 'Viernes', value: 6 },
    { label: 'Sábado', value: 7 }
  ];


  return (
    <div>
      <header className="fixed-panel">
        <div>
          <CustomProvider locale={es_AR}>
            <SelectPicker
              data={weekDays}
              className={styles.datePicker}
              placeholder="Seleccione un día de la semana"
              searchable={false}
              style={{ flex: 1, width: 300, marginLeft: 600 }}
              onSelect={handleCalendarClick}
            />
          </CustomProvider>
        </div>
        <button type="button" className={styles.reseveButton}>Reserva de Turno</button>
        <div>
          <div className="cancha"></div>
          <div className="time-header">Horarios</div>
          <div className="cancha">Cancha 1</div>
          <div className="cancha">Cancha 2</div>
          <div className="cancha">Cancha 3</div>
          <div className="cancha">Cancha 4</div>
          <div className="time-header">Horarios</div>
        </div>
      </header>
      {data && (
        <div className='separate'>

          {/* {
          data.map(turno => (
            <ListadoCancha turnos={cancha.turnos} />
            ))
          } */}

          <HourList></HourList>
          <ListadoCanchaFijo turnos={data.filter(turno => turno.field === 1)} handleCalendarClick={handleCalendarClick} />
          <ListadoCanchaFijo turnos={data.filter(turno => turno.field === 2)} handleCalendarClick={handleCalendarClick} />
          <ListadoCanchaFijo turnos={data.filter(turno => turno.field === 3)} handleCalendarClick={handleCalendarClick} />
          <ListadoCanchaFijo turnos={data.filter(turno => turno.field === 4)} handleCalendarClick={handleCalendarClick} />
          <HourList></HourList>
        </div>
      )}
    </div>
  );
}
export default ListadoFijos;