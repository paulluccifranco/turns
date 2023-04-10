import React from 'react';
import { Horario } from './Turn';



function TurnList (props){

  return (
    <div className='horarios'>
      {
        props.turnos.map((hora) => <Horario hora={hora} handleCalendarClick={props.handleCalendarClick}/>)
      }
    </div>
  );
}

export default TurnList;