import React from 'react';
import { Horario } from './Horario';


// const horas = [
//   { hora: '01:00' },
//   { hora: '02:00' },
//   { hora: '03:00' },
//   { hora: '04:00' },
//   { hora: '05:00' },
//   { hora: '06:00' },
//   { hora: '07:00' },
//   { hora: '08:00' },
//   { hora: '09:00' },
//   { hora: '10:00' },
//   { hora: '11:00' },
//   { hora: '12:00' },
//   { hora: '13:00' },
//   { hora: '14:00' },
//   { hora: '15:00' },
//   { hora: '16:00' },
//   { hora: '17:00' },
//   { hora: '18:00' },
//   { hora: '19:00' },
//   { hora: '20:00' },
//   { hora: '21:00' },
//   { hora: '22:00' },
//   { hora: '23:00' },
//   { hora: '24:00' }
// ];

function ListadoCancha (props){

  return (
    <div className='horarios'>
      {
        props.turnos.map((hora) => <Horario hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default ListadoCancha;