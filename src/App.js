import Hand from './Hand';
import Mulligan from './Mulligan';
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


  // Return all the card images (png)
  return (
    <>
      <h1>Jacks Or Better</h1>
      <h2>Money: ${money}</h2>

      {/* if bet = 0 show bet container else show cards */}
      {bet === 0 ? (
        <div className="container">
          <div className="betContainer">
            {/* number field */}
            <input type="number" min="1" max={money} step="1"></input>
            {/* bet button */}
            <button onClick={() => {

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
            }}>Bet</button>
          </div>
          <div id="betError"></div>
        </div>
      ) : (
        <div className="container">
          <Hand cards={hand} setHandMulligan={setHandMulligan} setNumMulligan={setNumMulligan}/>
          <Mulligan cards={hand} handMulligan={handMulligan} setHand={setHand} deckID={deckID}
          setHandMulligan={setHandMulligan} numMulligan={numMulligan} setNumMulligan={setNumMulligan}/>
        </div>
      )}
    </>
  );
}

export default App;

