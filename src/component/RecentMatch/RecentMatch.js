import React from 'react';
import DefaultImage from '../../assets/default.png';
import './RecentMatch.css';

export default function RecentMatch(props) {
    const addDefaultSrc = (e) => {
        e.target.src = DefaultImage;
    };

    const durationMatch = () => {
        let unix_timestamp = props.duration;

        var time = new Date(unix_timestamp * 1000);
        var minutes = time.getMinutes();
        var seconds = "0" + time.getSeconds();

        var formatTime = `${minutes} : ${seconds.substr(-2)}`;
        return formatTime;
    };

    return (
        <div className="container-rm">
            <div className="container-id">
                <p id="match-id">{props.matchId}</p>
                <p>{props.league}</p>
            </div>
            <div className="container-duration">
                <p>{durationMatch()}</p>
                <p>{props.side}</p>
            </div>
            <div className="container-result">
                <p id={props.result === "Won Match" ? "wins" : "losses"}>{props.result}</p>
            </div>
            <div className="container-oppTeam">
                <img id="logo-oppTeam" src={props.oppLogo} onError={addDefaultSrc} alt={props.name} />
                <p>{props.oppName}</p>
            </div>
        </div>
    );
}
