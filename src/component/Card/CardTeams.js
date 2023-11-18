import React from 'react';
import "./Card.css";
import DefaultImage from '../../assets/default.png';

export default function CardTeams(props) {
    const addDefaultSrc = (e) => {
        e.target.src = DefaultImage;
    };

    return (
        <div className="container-card">
            <img src={props.img} onError={addDefaultSrc} alt={props.tag} />
            <div className="container-text">
                <h3 id="teams-name">{props.name}</h3>
                <div className="container-desc">
                    <p id="wins">Wins:<br />{props.win}</p>
                    <p id="losses">Losses:<br />{props.lose}</p>
                </div>
            </div>
        </div>
    );
}
