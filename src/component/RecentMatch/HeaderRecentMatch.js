import React from 'react';
import './RecentMatch.css';

export default function HeaderRecentMatch() {
    return (
        <div className="header-rm">
            <div className="header-id">
                <h4>ID</h4>
            </div>
            <div className="container-duration">
                <h4>Duration</h4>
            </div>
            <div className="container-result">
                <h4>Result</h4>
            </div>
            <div className="container-oppTeam">
                <h4>Opposing Team</h4>
            </div>
        </div>
    );
}
