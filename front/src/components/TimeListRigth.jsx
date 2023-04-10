import React from 'react';


const horarios = [
  { hora: '08:00' },
  { hora: '09:30' },
  { hora: '11:00' },
  { hora: '12:30' },
  { hora: '14:00' },
  { hora: '15:30' },
  { hora: '17:00' },
  { hora: '18:30' },
  { hora: '20:00' },
  { hora: '21:30' },
  { hora: '23:00' },
  { hora: '00:30' },
  { hora: '02:00' }
];


function ListadoHorarios() {
  const listaHorarios = horarios.map((horario) =>
    <li>
      <div className="hour">{horario.hora}</div>
    </li>
  );
  return (
    <div className='time-container-rigth'>
      {horarios.map((horario) =>
        <div className="hour">{horario.hora}</div>
      )}
    </div>
  );
}

export default ListadoHorarios;