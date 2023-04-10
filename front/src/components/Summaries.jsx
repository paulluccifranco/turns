import { useState } from "react";
import styles from '../assets/Summaries.module.css';

export default function Summaries () {
    const [showResume, setShowResume] = useState(false);


    return (
        <div className={styles.summariesFrame}>
            <button onClick={() => setShowResume(true)}>Resumen del Turno</button>
            <button onClick={() => setShowResume(true)}>Resumen de Ventas</button>
            <button onClick={() => setShowResume(true)}>Seleccionar Productos Para Resumen del Dia</button>
        </div>
    )
}