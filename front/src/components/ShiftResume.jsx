import React, { useState } from 'react';
import { apiGet } from '../services/api';

export function ShiftResume (props) {
    let porJugar = 0;
    let jugando = 0;
    let terminado = 0;
    let falto = 0;
    let pago = 0;

    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleCalendarClick = (date) => {
        const token = localStorage.getItem('token');
        apiGet(`/turns/${selectedDate}`, token)
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