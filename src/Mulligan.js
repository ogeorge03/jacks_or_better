import React from 'react'
import axios from 'axios';

function Mulligan({cards, handMulligan, setHand, deckID, setHandMulligan}) {
  // mulligan away the cards that are true in handMulligan
  // shuffle those cards back into the deck
  // draw new cards to replace the mulliganed cards
  // setHandMulligan to all false
  // setHand to the new hand


  return (
    <>
      <div className="container mulliganBtn">
        <button onClick={() => {
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
          setHandMulligan([false, false, false, false, false]);
          shuffleCards();
        }}>Mulligan</button>
      </div>
    </>
  )
}

export default Mulligan
