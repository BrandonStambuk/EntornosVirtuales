import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'rgb(68, 116, 157)' }}>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Opción 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Opción 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Opción 3</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Opción 4</a>
                </li>            
            </ul>
        </nav>
    );
};

export default Navbar;
