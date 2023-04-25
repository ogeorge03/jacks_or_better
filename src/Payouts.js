import React from 'react'
import {Table, Button} from 'react-bootstrap';
import { useState } from 'react';
import {Modal} from 'react-bootstrap'

// Button that brings up a modal showing the payouts for each hand
// Modal should have a close button
// Modal should have a table with the payouts for each hand
// Modal should have a table with the probabilities for each hand

function Payouts() {

  const [modalIsOpen, setModalIsOpen] = useState(false);


  return (
    <>
      <Button variant="primary" onClick={() => setModalIsOpen(true)}>
        Payouts
      </Button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <h1 id="payouts-title">Payouts</h1>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
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
        </Modal.Body>
      </Modal>
    </>
  )
}


export default Payouts
