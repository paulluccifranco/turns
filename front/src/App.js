import React, { useEffect, useState } from 'react';
import './assets/styles.css';
import 'rsuite/dist/rsuite.min.css';
import Menu from './components/Menu';
import LeftPanel from './components/LeftPanel';



function App() {


  return (
    <div>
      <Menu></Menu>
      <LeftPanel></LeftPanel>
    </div>
  );
}
export default App;