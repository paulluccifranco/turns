import React, { useEffect, useState } from 'react';
import './assets/styles.css';
import 'rsuite/dist/rsuite.min.css';
import Menu from './components/Menu';
import LeftPanel from './components/LeftPanel';
import ShiftContext from './contexts/ShiftContext';
import { url } from './services/api';



function App() {

  const [shift, setShift] = useState();

  useEffect(() => {
    fetch(`${url}/shift/last`)
      .then(response => response.json())
      .then(data => setShift(data))
      .catch(error => console.log(error));
  }, [])


  return (
    <div>
      <ShiftContext.Provider value={shift}>
        <Menu />
        <LeftPanel />
      </ShiftContext.Provider>
    </div>
  );
}
export default App;