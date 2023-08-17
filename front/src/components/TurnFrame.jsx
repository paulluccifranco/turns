import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import { CustomProvider, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import HourList from './HourList';
import TurnList from './TurnList';
import {url} from '../services/api';
import es_AR from 'rsuite/locales/es_AR';
import styles from '../assets/Horario.module.css';


function ListadoTurnos() {

  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    handleCalendarClick(selectedDate);
  }, []);


  const handleCalendarClick = (date) => {
    fetch(`${url}/turns/${date}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
      setSelectedDate(date);
  }


  return (
    <div>
      <header className="fixed-panel">
        <div>
          <CustomProvider locale={es_AR}>
            <DatePicker oneTap editable={false} className={styles.datePicker} value={selectedDate} onSelect={handleCalendarClick} />
          </CustomProvider>
        </div>
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
          <TurnList turnos={data.filter(turno => turno.field === 1)} handleCalendarClick={handleCalendarClick} />
          <TurnList turnos={data.filter(turno => turno.field === 2)} handleCalendarClick={handleCalendarClick} />
          <TurnList turnos={data.filter(turno => turno.field === 3)} handleCalendarClick={handleCalendarClick} />
          <TurnList turnos={data.filter(turno => turno.field === 4)} handleCalendarClick={handleCalendarClick} />
          <HourList></HourList>
        </div>
      )}
    </div>
  );
}
export default ListadoTurnos;