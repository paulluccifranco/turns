import React, { useState, useEffect } from 'react';
import { url } from '../services/api';

export function ShiftResume (props) {
    let porJugar = 0;
    let jugando = 0;
    let terminado = 0;
    let falto = 0;
    let pago = 0;

    const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

    const handleCalendarClick = (date) => {
        fetch(`${url}/turns/${selectedDate}`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.log(error));
          setSelectedDate(date);
      }



    return (
              <div>
              </div>
    );
}