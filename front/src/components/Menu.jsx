import React, { useState, useContext } from 'react';
import style from '../assets/Menu.module.css';
import logo from '../images/Logo.png';
import { url } from '../helpers/api';
import ShiftContext from '../contexts/ShiftContext';
import { Sells } from './Sells';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import whatsappIcon from '../images/WhatsAppIcon.svg';
import Movement from './Movement';

function Menu() {

  const shift = useContext(ShiftContext);
  const [sellModal, setSellModal] = useState(false);
  const [shiftCloseModal, setShiftCloseModal] = useState(false);
  const [movementsModal, setMovementsModal] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [shiftDescription, setShiftDescription] = useState('MAÑANA');
  const [phone, setPhone] = useState('');
  const [messagge, setMessagge] = useState('');

  function getResumeMessage() {
    const shiftId = shift.id;
    fetch(`${url}/summary/${shiftId}`)
        .then(response => response.text())
        .then(data => setMessagge(data))
        .catch(error => console.log(error))
        .finally(setShiftCloseModal(true));
  }

  const openShift = (event) => {
    event.preventDefault();
    if (!employeeName) {
      NotificationManager.error('Debe indicar su nombre', 'Error al Iniciar el Turno', 2000);
      return;
    }
    const shiftId = shift.id;
    const data = { shiftId, employeeName, shiftDescription };
    console.log(shiftDescription);
    fetch(`${url}/shift/open`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 409) {
          console.log("Gholasas");
          NotificationManager.error('El Turno ' + shiftDescription + ' del dia de la Fecha ya Fue Abierto', 'Error al Abrir Turno', 2000);
          return;
        } else {
          window.location.reload();
        }
      })
      .catch(error => console.log(error));
  };

  function closeShift(event) {
    event.preventDefault();
    const shiftId = shift.id;
    fetch(`${url}/shift/${shiftId}/close`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .catch(error => console.log(error));
    window.location.reload();
  };

  const openLast = (event) => {
    event.preventDefault();
    fetch(`${url}/shift/open-last`, {
        method: 'DELETE'
    })
        .then(response => {
            console.log('El turno ha sido eliminado correctamente');
        })
        .catch(error => {
            console.error('Error:', error);
        });
        window.location.reload();
};

  function sendWhatsApp() {
    const whatsappTexto = encodeURIComponent(messagge.replace(/\n/g, '\r\n'));
    window.open(`https://wa.me/549${phone}?text=${whatsappTexto}`, "_blank");
  }

  function handleInputChange(event) {
    const inputValue = event.target.value;
    const newValue = inputValue.replace(/[^0-9]/g, "");
    setPhone(newValue);
  }


  return (
    <>
      <div className={style.menuContainer}>
        <NotificationContainer className="custom-notification-container" />
        <img className={style.logo} src={logo} />
        <button type="button" className={style.movementButton} onClick={() => setMovementsModal(true)}>Movimientos</button>
        <button type="button" className={style.sellButton} onClick={() => setSellModal(true)}>Venta</button>
        <div className={style.shiftInfo}>
          {shift?.employee === null ? (
            <>
              <div className={style.disabledFrame}>
                <h3 style={{ color: "white" }}>La pantalla está bloqueada</h3>
                <form className={style.disabledFrameForm}>
                  <label htmlFor="description">Nombre de Empleado:</label>
                  <input type="text" id="description" value={employeeName} autoFocus onChange={(e) => setEmployeeName(e.target.value)} /><br />
                  <label>Seleccione el Turno:</label>
                  <select value={shiftDescription} onChange={e => setShiftDescription(e.target.value)}>
                    <option value="MAÑANA">MAÑANA</option>
                    <option value="TARDE">TARDE</option>
                  </select>
                  <button type="button" onClick={openShift}>Abrir Turno</button>
                  <button type="button" onClick={openLast}>Abrir Ultimo Turno</button>
                </form>

              </div>
            </>
          ) : (
            <div onClick={() => getResumeMessage()}>
              <h5>Empleado: {shift?.employee}</h5>
              <h5>Truno: {shift?.shiftEnum}</h5>
            </div>
          )}

        </div>
      </div>
      {sellModal && (
        <div className={style.modalContainer}>
          <button type="close" onClick={() => setSellModal(false)}>×</button>
          <div className={style.sellsModal}>
            <Sells turnId={0}></Sells>
          </div>
        </div>
      )}
      {shiftCloseModal && (
        <div className={style.modalContainer}>
          <button type="close" onClick={() => setShiftCloseModal(false)}>×</button>
          <div className={style.modal}>
            <div className={style.messaggeText}>
              <label>Mensaje:</label>
              <textarea value={messagge} readOnly />
            </div>
            <form className={style.closeShiftForm}>
              <label>Telefono:</label><br />
              <input type="text" autoFocus value={phone} onChange={handleInputChange} /><br />
              <button className={style.whatsappButton} onClick={sendWhatsApp}>
                <img src={whatsappIcon} alt="whatsapp-icon" />
                Enviar WhatsApp
              </button>
            </form>
            <button className={style.closeShiftButton} onClick={closeShift}>Cerrar Turno</button>
          </div>
        </div>
      )}
      {movementsModal && (
        <div className={style.modalContainer}>
          <button type="close" onClick={() => setMovementsModal(false)}>×</button>
          <div className={style.sellsModal}>
            <Movement />
          </div>
        </div>
      )}
    </>
  );
}
export default Menu;