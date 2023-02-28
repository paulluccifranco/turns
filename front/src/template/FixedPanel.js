import React from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function FixedPanel() {
  return (
    <header className="fixed-panel">
    <div>
      <Calendar compact bordered renderCell={renderCell}/>
    </div>
      <div>
        <div className="cancha">Horarios</div>
        <div className="cancha">Cancha 1</div>
        <div className="cancha">Cancha 2</div>
        <div className="cancha">Cancha 3</div>
      </div>
    </header>
  );
}

export default FixedPanel;
