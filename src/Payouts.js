import React from 'react'
import Modal from 'react-modal';
import {Table, Button} from 'react-bootstrap';
import { useState } from 'react';

// Button that brings up a modal showing the payouts for each hand
// Modal should have a close button
// Modal should have a table with the payouts for each hand
// Modal should have a table with the probabilities for each hand

function Payouts() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement('#root')
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  Modal.defaultStyles.content.width = '66%'
  Modal.defaultStyles.content.height = '500px'
  Modal.defaultStyles.content.margin = 'auto'
  Modal.defaultStyles.content.padding = '0'

  return (
    <>
      <div className="container payoutsBtn">
        <Button id='payout-btn' onClick={() => {
          setModalIsOpen(true);
        }}>Payouts</Button>
      </div>
      <Modal id="payoutsModal" isOpen={modalIsOpen} onRequestClose={() => {
        setModalIsOpen(false);
      }}>
        <div className="container">
          <Button variant='danger' id="modalClose" onClick={() => {
            setModalIsOpen(false);
          }}>X</Button>
          <h1 id="payouts-h1">Payouts</h1>

          <br />
          <Table striped bordered hover variant="light" responsive="sm">
            <thead>
              <tr>
                <th>Hand</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Royal Flush</td>
                <td>250</td>
              </tr>
              <tr>
                <td>Straight Flush</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Four of a Kind</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Full House</td>
                <td>9</td>
              </tr>
              <tr>
                <td>Flush</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Straight</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Three of a Kind</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Two Pair</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Pair of Jacks or Better</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
          </div>
      </Modal>
    </>
  )
}


export default Payouts
