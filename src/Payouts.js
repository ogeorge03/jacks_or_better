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
  const [royalFlushDescription, setRoyalFlushDescription] = useState(false);
  const [straightFlushDescription, setStraightFlushDescription] = useState(false);
  const [fourOfAKindDescription, setFourOfAKindDescription] = useState(false);
  const [fullHouseDescription, setFullHouseDescription] = useState(false);
  const [flushDescription, setFlushDescription] = useState(false);
  const [straightDescription, setStraightDescription] = useState(false);
  const [threeOfAKindDescription, setThreeOfAKindDescription] = useState(false);
  const [twoPairDescription, setTwoPairDescription] = useState(false);
  const [jacksOrBetterDescription, setJacksOrBetterDescription] = useState(false);
  
  



  return (
    <>
      <Button variant="primary" onClick={() => setModalIsOpen(true)}>
        Payouts
      </Button>
      <Modal show={modalIsOpen} onHide={() => {
        setModalIsOpen(false)
        setRoyalFlushDescription(false)
        setStraightFlushDescription(false)
        setFourOfAKindDescription(false)
        setFullHouseDescription(false)
        setFlushDescription(false)
        setStraightDescription(false)
        setThreeOfAKindDescription(false)
        setTwoPairDescription(false)
        setJacksOrBetterDescription(false)
        }}>
        <Modal.Header closeButton>
          <h1 id="payouts-title">Payouts</h1>
        </Modal.Header>
        <p id="payouts-hint">Click on a hand to see a description of it.</p>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Hand</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => setRoyalFlushDescription(!royalFlushDescription)}>
                <td>Royal Flush</td>
                <td>250</td>
              </tr>
              {royalFlushDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Royal Flush is a straight flush that starts with a 10 and ends with an Ace.</p>
                  <p>For example, 10, J, Q, K, A of the same suit.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setStraightFlushDescription(!straightFlushDescription)}>
                <td>Straight Flush</td>
                <td>50</td>
              </tr>
              {straightFlushDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Straight Flush is a hand that is both a straight and a flush.</p>
                  <p>For example, 4, 5, 6, 7, 8 of the same suit.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setFourOfAKindDescription(!fourOfAKindDescription)}>
                <td>Four of a Kind</td>
                <td>25</td>
              </tr>
              {fourOfAKindDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Four of a Kind is a hand that has four cards of the same rank.</p>
                  <p>For example, 4, 4, 4, 4, 8.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setFullHouseDescription(!fullHouseDescription)}>
                <td>Full House</td>
                <td>9</td>
              </tr>
              {fullHouseDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Full House is a hand that has three cards of the same rank and two cards of the same rank.</p>
                  <p>For example, 4, 4, 4, 8, 8.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setFlushDescription(!flushDescription)}>
                <td>Flush</td>
                <td>6</td>
              </tr>
              {flushDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Flush is a hand that has five cards of the same suit.</p>
                  <p>For example, 4, 6, 8, 10, J of the same suit.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setStraightDescription(!straightDescription)}>
                <td>Straight</td>
                <td>4</td>
              </tr>
              {straightDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Straight is a hand that has five cards in sequential order.</p>
                  <p>For example, 4, 5, 6, 7, 8.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setThreeOfAKindDescription(!threeOfAKindDescription)}>
                <td>Three of a Kind</td>
                <td>3</td>
              </tr>
              {threeOfAKindDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Three of a Kind is a hand that has three cards of the same rank.</p>
                  <p>For example, 4, 4, 4, 8, 10.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setTwoPairDescription(!twoPairDescription)}>
                <td>Two Pair</td>
                <td>2</td>
              </tr>
              {twoPairDescription && (
                <tr>
                  <td colSpan="2">
                  <p>A Two Pair is a hand that has two cards of the same rank and two cards of the same rank.</p>
                  <p>For example, 4, 4, 8, 8, 10.</p>
                  </td>
                </tr>
              )}
              <tr onClick={() => setJacksOrBetterDescription(!jacksOrBetterDescription)}>
                <td>Jacks or Better</td>
                <td>1</td>
              </tr>
              {jacksOrBetterDescription && (
                <tr>
                  <td colSpan="2">
                  <p>Jacks or Better is a hand that has two cards of the same rank that are either Jacks, Queens, Kings, or Aces.</p>
                  <p>For example, J, J, 4, 8, 10.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default Payouts