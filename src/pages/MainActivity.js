import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CardTeams from '../component/Card/CardTeams';
import DefaultImage from '../assets/default.png';
import './Activity.css';
import ReactPaginate from 'react-paginate';
import { Rings } from "react-loader-spinner";

export default function MainActivity() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

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
    }, [isLoaded, currentPage]);

    const perPage = 10;
    const pageVisited = currentPage * perPage;
    const currentData = data.slice(pageVisited, pageVisited + perPage);
    const pageCount = Math.ceil(data.length / perPage);

    const changePage = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <main>
            {isLoading ? (
                <div className="loading">
                    <Rings color="#B5B09C" height={200} width={200} />
                </div>
            ) : (
                <div className="container-teams">
                    {
                        currentData.map((item, index) => {
                            return (
                                <NavLink
                                    to={`/teams/players/${item.team_id}`}
                                    key={index}
                                    className="player-link"
                                >
                                    <CardTeams
                                        name={item.name !== "" ? item.name : "TBD"}
                                        img={item.logo_url !== null ? item.logo_url : DefaultImage}
                                        win={item.wins}
                                        lose={item.losses}
                                        tag={item.tag}
                                        key={index}
                                        teamId={item.team_id}
                                    />
                                </NavLink>
                            );
                        })
                    }
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        marginPagesDisplayed={4}
                        pageRangeDisplayed={3}
                        onPageChange={changePage}
                        containerClassName={"paginationBtn"}
                        previousLinkClassName={"previousBtn"}
                        nextLinkClassName={"nextBtn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            )}
        </main >
    );
}
