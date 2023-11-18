import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Card.css";
import DefaultImage from '../../assets/default-profile.png';

export default function CardPlayers(props) {
    const [data, setData] = useState([]);
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.opendota.com/api/players/${props.playerId}`);
            if (request.status === 200) {
                setData(request.data.profile);
                setAvatar(data.avatarfull);
            }
        }
        fetchData();
    }, [data.avatarfull, props.playerId]);

    const addDefaultSrc = (e) => {
        e.target.src = DefaultImage;
    };

    return (
        <div className="container-card">
            <img src={avatar} onError={addDefaultSrc} alt={props.name} />
            <div className="container-text">
                <h3 id="teams-name">{props.name}</h3>
                <div className="container-desc">
                    <p id="games">Games:<br />{props.games}</p>
                    <p id="winrate">Winrate:<br />{props.winrate.toFixed(1)}</p>
                </div>
            </div>
        </div>
    );
}
