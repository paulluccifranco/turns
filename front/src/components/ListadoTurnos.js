import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import { CustomProvider, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ListadoHorarios from './ListadoHorarios';
import ListadoCancha from './ListadoCancha';
import ListadoCancha4 from './ListadoCancha4';
import TimeListRigth from './TimeListRigth';
import {url} from '../helpers/api';
import es_AR from 'rsuite/locales/es_AR';
import styles from '../assets/Horario.module.css';


function ListadoTurnos() {

  const [data, setData] = useState([]);
  const [showResume, setShowResume] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let porJugar = 0;
  let jugando = 0;
  let terminado = 0;
  let falto = 0;
  let pago = 0;

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

  function closeResume () {
    porJugar = 0;
  jugando = 0;
  terminado = 0;
  falto = 0;
  pago = 0;
    setShowResume(false);
  }


  return (
    <div>
      <header className="fixed-panel">
        <div>
          <span style={{ width: 200, marginLeft: 400, fontWeight: 'bold', fontSize: 20 }}>Listado de Turnos</span>
          <CustomProvider locale={es_AR}>
            <DatePicker oneTap style={{ width: 200, marginLeft: 200 }} value={selectedDate} onSelect={handleCalendarClick} />
          </CustomProvider>
          <button style={{ width: 200, marginLeft: 400, fontWeight: 'bold', fontSize: 20 }} onClick={() => setShowResume(true)}>Resumen de Turnos</button>
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
          <ListadoHorarios></ListadoHorarios>
          <ListadoCancha turnos={data.filter(turno => turno.field === 1)} handleCalendarClick={handleCalendarClick} />
          <ListadoCancha turnos={data.filter(turno => turno.field === 2)} handleCalendarClick={handleCalendarClick} />
          <ListadoCancha turnos={data.filter(turno => turno.field === 3)} handleCalendarClick={handleCalendarClick} />
          <ListadoCancha4 turnos={data.filter(turno => turno.field === 4)} handleCalendarClick={handleCalendarClick} />
          <TimeListRigth></TimeListRigth>
        </div>
      )}
      {showResume && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <form style={{ textAlign: "left" }}>
              <span>Los turnos del dia quedaron de la siguiente manera: </span><br/>
                {data.map((turn) => 
                {
                  if(turn.name){porJugar = porJugar+1};
                  if(turn.stateId === 2){jugando = jugando+1};
                  if(turn.stateId === 3){terminado = terminado+1};
                  if(turn.stateId === 4){falto = falto+1};
                  if(turn.stateId === 5){pago = pago+1};
                }
                )}
                <span>Quedan por Jugar: {porJugar} turnos</span><br/>
                <span>Estan Jugando: {jugando} turnos</span><br/>
                <span>Terminados: {terminado} turnos</span><br/>
                <span>Faltaron: {falto} turnos</span><br/>
                <span>Pagaron: {pago} turnos</span><br/>

              <button type="submit" onClick={() => closeResume([])}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListadoTurnos;