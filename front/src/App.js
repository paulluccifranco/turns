import React, { useEffect, useState } from 'react';
import './assets/styles.css';
import 'rsuite/dist/rsuite.min.css';
import Menu from './components/Menu';
import LeftPanel from './components/LeftPanel';
import ShiftContext from './contexts/ShiftContext';
import { apiGet } from './services/api';
import Login from './components/Login';



function App() {

  const [shift, setShift] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('loggedIn')
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem('token');
    apiGet('/shift/last', token)
      .then(response => response.json())
      .then(data => setShift(data))
      .catch(error => console.log(error));
  }, [isAuthenticated]);

  const handleLoginSuccess = (data) => {
    // Guardamos un flag simple y el token dummy que envía el backend
    localStorage.setItem('loggedIn', 'true');
    if (data && data.token) {
      localStorage.setItem('token', data.token);
    }
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

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