import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Importar el icono de usuario de Font Awesome

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'rgb(68, 116, 157)' }}>
             <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FaUser /> {/* Icono de usuario */}
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/stats">Estadisticas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/mostrar">Ejercicios</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/agregar">Agregar Ejercicio</a>
                </li>
            </ul>
           
        </nav>
    );
};

export default Navbar;