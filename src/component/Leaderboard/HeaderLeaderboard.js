import React from 'react';
import './Leaderboard.css';

export default function HeaderLeaderboard(props) {
    return (

        <div className="header-lead">
            <div className="container-text">
                <p>{props.rankDesc}</p>
            </div>
            <div className="container-profile">
                <p>{props.teamsDesc}</p>
            </div>
            <div className="container-text">
                <p>{props.rateDesc}</p>
            </div>
        </div>
    );
}
