import React from 'react';
import { HorarioFijo } from './HorarioFijo';



function ListadoCancha (props){

  return (
    <div className='horarios'>
      {
        props.turnos.map((hora) => <HorarioFijo hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default ListadoCancha;