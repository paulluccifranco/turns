import React from 'react';


const horarios = [
  { hora: '07:30' },
  { hora: '09:00' },
  { hora: '10:30' },
  { hora: '12:00' },
  { hora: '13:30' },
  { hora: '15:00' },
  { hora: '16:30' },
  { hora: '18:00' },
  { hora: '19:30' },
  { hora: '21:00' },
  { hora: '22:30' },
  { hora: '00:00' },
  { hora: '01:30' }
];


function HourList() {
  const listaHorarios = horarios.map((horario) =>
    <li>
      <div className="hour">{horario.hora}</div>
    </li>
  );
  return (
    <div className='time-container'>
      {horarios.map((horario) =>
        <div className="hour">{horario.hora}</div>
      )}
    </div>
  );
}

export default HourList;