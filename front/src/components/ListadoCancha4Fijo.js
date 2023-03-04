import React from 'react';
import { HorarioFijo } from './HorarioFijo';



function ListadoCancha4 (props){

  return (
    <div className='horarios4'>
      {
        props.turnos.map((hora) => <HorarioFijo hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default ListadoCancha4;