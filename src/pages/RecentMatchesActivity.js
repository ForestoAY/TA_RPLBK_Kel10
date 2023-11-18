import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultImage from '../assets/default.png';
import './Activity.css';
import { Rings } from "react-loader-spinner";
import { useParams, NavLink } from "react-router-dom";
import RecentMatch from '../component/RecentMatch/RecentMatch';
import HeaderRecentMatch from '../component/RecentMatch/HeaderRecentMatch';

export default function RecentMatchesActivity() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const request = await axios.get(`https://api.opendota.com/api/teams/${id}/matches`);
                if (request.status === 200) {
                    setData(request.data);
                    const timer = setTimeout(() => {
                        setIsLoaded(true);
                        setIsLoading(false);
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(true);
            }
        };
        if (!isLoaded) {
            fetchData();
        }
    }, [isLoaded, data, id]);


    return (
        <main>
            {isLoading ? (
                <div className="loading">
                    <Rings color="#B5B09C" height={200} width={200} />
                </div>
            ) : (
                <div className="container-teams">
                    <div className="header-detail">
                        <div className="header-desc">
                            <NavLink
                                to={`/teams/players/${id}`}
                                className="header-link"
                            >
                                <button class="button">Players</button>
                            </NavLink>
                        </div>
                        <div className="header-desc">
                            <NavLink
                                to={`/teams/matches/${id}`}
                                className="header-link"
                            >
                                <button class="button">Recent Matches</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="rm-desc">
                        <h1>Recent Matches</h1>
                    </div>
                    <HeaderRecentMatch />
                    {
                        data.slice(0, 99).map((item, index) => {
                            return (
                                <RecentMatch
                                    matchId={item.match_id}
                                    league={item.league_name}
                                    side={item.radiant === true ? "Radiant" : "Dire"}
                                    result={item.radiant === item.radiant_win ? "Won Match" : "Lost Match"}
                                    oppLogo={item.opposing_team_logo === null ? DefaultImage : item.opposing_team_logo}
                                    oppName={item.opposing_team_name}
                                    duration={item.duration}
                                    key={index}
                                />
                            );
                        })
                    }
                </div>
            )}
        </main>
    );
}
