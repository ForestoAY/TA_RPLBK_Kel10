import React from 'react';
import Logo from '../../assets/default.png';
import { FaSteam } from 'react-icons/fa';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const Location = useLocation();
    const history = useNavigate();
    console.log(Location.pathname);
    if (Location.pathname !== '/teams' && Location.pathname !== '/leaderboard') {
        return (
            <header>
                <div className="header">
                    <MdOutlineArrowBackIosNew className="arrow-back" size="30px" onClick={() => history(-1)} />
                    <img src={Logo} alt="Logo" id="logo" />
                    <h1 id="title">Dota 2 App Teams</h1>
                    <FaSteam size="40px" />
                </div>
            </header>
        );
    }
    else {
        return (
            <header>
                <div className="header">
                    <img src={Logo} alt="Logo" id="logo" />
                    <h1 id="title">Dota 2 App Teams</h1>
                    <FaSteam size="40px" />
                </div>
            </header>
        );
    }
}
