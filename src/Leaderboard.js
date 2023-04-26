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
                console.log(res.data.leaderboard);
            } catch (error) {
                console.log(error);
            }
        }
        getLeaderboard();
    }, []);

    // every 1 second, update leaderboard
    useEffect(() => {
        const interval = setInterval(() => {
            async function getLeaderboard() {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/getLeaderboard`);
                    setLeaderboard(res.data.leaderboard);
                    console.log(res.data.leaderboard);
                } catch (error) {
                    console.log(error);
                }
            }
            getLeaderboard();
        }, 1000);
        return () => clearInterval(interval);
    }, []);




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

  return (
    <>
        <button className="btn btn-primary" onClick={handleShow}>
            Leaderboard
        </button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header id="modal-header" closeButton>
                <h1 id="leaderboard-title">Leaderboard</h1>
            </Modal.Header>
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
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.username}</td>
                                <td>${formatMoney(user.high_score.$numberDecimal)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Leaderboard