import React from 'react';


const horarios = [
  { hora: '07:30' },
  { hora: '08:00' },
  { hora: '08:30' },
  { hora: '09:00' },
  { hora: '09:30' },
  { hora: '10:00' },
  { hora: '10:30' },
  { hora: '11:00' },
  { hora: '11:30' },
  { hora: '12:00' },
  { hora: '12:30' },
  { hora: '13:00' },
  { hora: '13:30' },
  { hora: '14:00' },
  { hora: '14:30' },
  { hora: '15:00' },
  { hora: '15:30' },
  { hora: '16:00' },
  { hora: '16:30' },
  { hora: '17:00' },
  { hora: '17:30' },
  { hora: '18:00' },
  { hora: '18:30' },
  { hora: '19:00' },
  { hora: '19:30' },
  { hora: '20:00' },
  { hora: '20:30' },
  { hora: '21:00' },
  { hora: '21:30' },
  { hora: '22:00' },
  { hora: '22:30' },
  { hora: '23:00' },
  { hora: '23:30' },
  { hora: '00:00' },
  { hora: '00:30' },
  { hora: '01:00' },
  { hora: '01:30' },
  { hora: '02:00' }
];


function ListadoHorarios() {
  const listaHorarios = horarios.map((horario) =>
    <li>
      <div className="hour">{horario.hora}</div>
    </li>
  );
  return (
    <div className='horarios' style={{ backgroundColor: '#fff' }}>
      {horarios.map((horario) =>
        <div className="hour">{horario.hora}</div>
      )}
    </div>
  );
}

export default ListadoHorarios;