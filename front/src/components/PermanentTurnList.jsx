import React from 'react';
import { PermanentTurn } from './PermanentTurn';



function ListadoCancha (props){

  return (
    <div className='horarios'>
      {
        props.turnos.map((hora) => <PermanentTurn hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default ListadoCancha;