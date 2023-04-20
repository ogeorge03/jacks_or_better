import Hand from './Hand';
import Mulligan from './Mulligan';
import Payouts from './Payouts';
import Winnings from './Winnings';
import {Alert, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Deck api = https://deckofcardsapi.com/

  const [deckID, setDeckID] = useState('');
  const [hand, setHand] = useState([]);
  const [handMulligan, setHandMulligan] = useState([false, false, false, false, false]);
  const [numMulligan, setNumMulligan] = useState(0);
  const [money, setMoney] = useState(100);
  const [bet, setBet] = useState(0);
  const [checkHand, setCheckHand] = useState(false);
  const [newDeck, setNewDeck] = useState(false);
  const [quit, setQuit] = useState(false);


  // Initialize deck
  useEffect(() => {
    async function getDeck() {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckID(res.data.deck_id);
    }
    getDeck();
  }, []);


  // Draw 5 cards
  useEffect(() => {
    async function drawCards() {
      if (deckID === "") return;

      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`);
      setHand(res.data.cards);
    }
    drawCards();
  }, [deckID]);

  useEffect(() => {
    async function newDeck(){
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckID(res.data.deck_id);
      setNewDeck(false);
    }
    newDeck();
  }, [newDeck, setNewDeck, setDeckID]);



  // Return all the card images (png)
  return (
    <>
      <Alert id="game-title">Jacks Or Better</Alert>
      <Payouts />
    {quit === false ? (
      <>
      <h2 id="money-title">Money: ${money}</h2>
      {bet !== 0 && <h2 id="bet-title">Bet: ${bet}</h2>}
      <br /> <br />
      {/* if bet = 0 show bet container else show cards */}
      {bet === 0 ? (
        <div className="container">
          <div className="betContainer">
            <h2>Place a bet</h2>
            {/* number field */}
            <Form.Control type="number" min="1" max={money} step="1"></Form.Control>
            {/* bet button */}
            <Button variant="primary" size="lg" onClick={() => {

              if (document.querySelector("input").value === "") {
                document.querySelector("#betError").innerHTML = "Please enter a bet";
                return;
              }
              if (Number(document.querySelector("input").value) > money) {
                document.querySelector("#betError").innerHTML = "You don't have enough money";
                return;
              }
              if (Number(document.querySelector("input").value) < 1) {
                document.querySelector("#betError").innerHTML = "Please enter a valid bet";
                return;
              }
              if (Number(document.querySelector("input").value) % 1 !== 0) {
                document.querySelector("#betError").innerHTML = "Bet must be a whole number";
                return;
              }

              setBet(Number(document.querySelector("input").value));
              setMoney((prev) => prev - Number(document.querySelector("input").value));
            }}>Bet</Button>
          <div id="betError"> </div>
          </div>
        </div>
      ) : (
        <>
          {checkHand === false ? (
            <div className="container hand-mulligan">
              <Hand cards={hand} setHandMulligan={setHandMulligan} setNumMulligan={setNumMulligan} />
              <Mulligan cards={hand} handMulligan={handMulligan} setHand={setHand} deckID={deckID}
                setHandMulligan={setHandMulligan} numMulligan={numMulligan} setNumMulligan={setNumMulligan} setCheckHand={setCheckHand} />
            </div>
          ) : (
            <Winnings cards={hand} bet={bet} setBet={setBet} money={money} setMoney={setMoney} setCheckHand={setCheckHand}
             setNewDeck={setNewDeck} setQuit={setQuit} />
          )}
    </>
  )
}</>) : (
  <div className="container game-over">
    <h1>Game Over</h1>
    <h2>Money: ${money}</h2>
    <Button onClick={() => window.location.reload()}>Restart?</Button>
    </div>
)
}

</>
);
}

export default App;