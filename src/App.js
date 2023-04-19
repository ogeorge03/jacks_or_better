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
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`);
      setHand(res.data.cards);
    }
    drawCards();
  }, [deckID]);


  // Return all the card images (png)
  return (
    <>
      <h1>Jacks Or Better</h1>
      <div className="container">
        <Hand cards={hand} setHandMulligan={setHandMulligan} />
        <Mulligan cards={hand} handMulligan={handMulligan} setHand={setHand} deckID={deckID} setHandMulligan={setHandMulligan} />
      </div>
    </>
  );
}

export default App;
