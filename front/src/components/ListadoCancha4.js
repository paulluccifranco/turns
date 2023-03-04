import React from 'react';
import { Horario } from './Horario';



function ListadoCancha4 (props){

  return (
    <div className='horarios4'>
      {
        props.turnos.map((hora) => <Horario hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default ListadoCancha4;