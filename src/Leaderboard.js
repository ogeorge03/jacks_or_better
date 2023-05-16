import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import {Modal} from 'react-bootstrap'
import formatMoney from './formatMoney';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/getLeaderboard`);
                setLeaderboard(res.data.leaderboard);
            } catch (error) {
                console.log(error);
            }
        }
        getLeaderboard();
    }, []);

    // every 10 seconds, update leaderboard
    useEffect(() => {
        const interval = setInterval(() => {
            async function getLeaderboard() {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/getLeaderboard`);
                    setLeaderboard(res.data.leaderboard);
                } catch (error) {
                    console.log(error);
                }
            }
            getLeaderboard();
        }, 10000);
        return () => clearInterval(interval);
    }, []);




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showUserDetails, setShowUserDetails] = useState(0);

    

  return (
    <>
        <button className="btn btn-primary" onClick={handleShow}>
            Leaderboard
        </button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header id="modal-header" closeButton>
                <h1 id="leaderboard-title">Leaderboard</h1>
            </Modal.Header>
            <p id="leaderboard-hint">Click on a user to see more details.</p>
            <Modal.Body>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">High Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <>
                            <tr key={index} onClick={() => setShowUserDetails(index + 1)}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.username}</td>
                                <td>${formatMoney(user.high_score.$numberDecimal)}</td>
                            </tr>

                            <Modal show={showUserDetails === index + 1} onHide={() => setShowUserDetails(0)}>
                                <Modal.Header closeButton>
                                    <h1 id="leaderboard-title">{user.username}</h1>
                                </Modal.Header>
                                <Modal.Body>
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Rank</th>
                                                <td>{index + 1}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">High Score</th>
                                                <td>${formatMoney(user.high_score.$numberDecimal)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Money</th>
                                                <td>${formatMoney(user.money.$numberDecimal)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Restarts</th>
                                                <td>{user.restarts}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Modal.Body>
                            </Modal>
                            </>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Leaderboard