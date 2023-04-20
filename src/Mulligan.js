import React from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap';

function Mulligan({cards, handMulligan, setHand, deckID, setHandMulligan, numMulligan, setCheckHand}) {
  // mulligan away the cards that are true in handMulligan
  // shuffle those cards back into the deck
  // draw new cards to replace the mulliganed cards
  // setHandMulligan to all false
  // setHand to the new hand


  return (
    <>
      <div className="container mulliganBtn">
        <Button id="mulligan-btn" onClick={async () => {
          const mulliganedCards = [];
          for (let i = 0; i < handMulligan.length; i++) {
            if (handMulligan[i]) {
              mulliganedCards.push(cards[i].code);
            }
          }
          async function shuffleCards() {
            // return the mulliganed cards to the deck
            for (let i = 0; i < mulliganedCards.length; i++) {
              await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/return/?cards=${mulliganedCards[i]}`);
            }
            // draw new cards to replace the mulliganed cards
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${mulliganedCards.length}`);
            const newCards = res.data.cards;
            // setHand to the new hand
            setHand((prev) => {
              const newHand = [...prev];
              for (let i = 0; i < mulliganedCards.length; i++) {
                newHand[cards.findIndex((card) => card.code === mulliganedCards[i])] = newCards[i];
              }
              return newHand;
            });

          }
          await shuffleCards();
          setHandMulligan([false, false, false, false, false]);
          setCheckHand(true);
        }}>{numMulligan === 0 ? "Keep Original Hand?" : `Mulligan ${numMulligan} Card${numMulligan === 1 ? "" : "s"}?`}</Button>
      </div>
    </>
  )
}

export default Mulligan
