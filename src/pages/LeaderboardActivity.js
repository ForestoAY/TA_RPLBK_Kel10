import React from 'react';
import axios from 'axios';
import Leaderboard from '../component/Leaderboard/Leaderboard';
import { useEffect, useState } from 'react';
import DefaultImage from '../assets/default.png';
import './Activity.css';
import { Rings } from "react-loader-spinner";
import HeaderLeaderboard from '../component/Leaderboard/HeaderLeaderboard';
import { NavLink } from 'react-router-dom';

export default function LeaderboardActivity() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const titleDesc = "Leaderboard";
    const rankDesc = "Rank";
    const teamsDesc = "Name";
    const rateDesc = "Rating";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const request = await axios.get("https://api.opendota.com/api/teams");
                if (request.status === 200) {
                    setData(request.data.filter(data => data.last_match_time >= 1621948945));
                    const timer = setTimeout(() => {
                        setIsLoaded(true);
                        setIsLoading(false);
                    }, 3000);
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
    }, [isLoaded]);

    return (
        <main>
            {isLoading ? (
                <div className="loading">
                    <Rings color="#B5B09C" height={200} width={200} />
                </div>
            ) : (
                <div className="container-teams">
                    <div className="player-desc">
                        <h1>{titleDesc}</h1>
                    </div>
                    
                    <HeaderLeaderboard
                        rankDesc={rankDesc}
                        teamsDesc={teamsDesc}
                        rateDesc={rateDesc}
                    />
                    {
                        data.slice(0, 100).map((item, index) => {
                            return (
                                <NavLink
                                    to={`/teams/players/${item.team_id}`}
                                    key={index}
                                >
                                <Leaderboard
                                    key={index}
                                    name={item.name}
                                    logo={item.logo_url !== null ? item.logo_url : DefaultImage}
                                    rate={item.rating}
                                    number={index + 1}
                                />
                                </NavLink>
                            );
                        })
                    }
                </div>
            )}
        </main >
    );
}
