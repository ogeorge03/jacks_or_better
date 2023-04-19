import React from 'react'
import { useEffect } from 'react';

function Hand({cards, setHandMulligan}) {

  // if cards have changed set all classes to card

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      document.getElementById(cards[i].code).className = 'card';
    }
  }, [cards]);


  return (
    <>
      <div className="container hand">
        {cards.map((card) => (
          <img src={card.image} alt={card.code} id={card.code} className='card' onClick={
            () => {
              if (document.getElementById(card.code).className === 'card') {
                document.getElementById(card.code).className = 'card mulligan';
                setHandMulligan((prev) => {
                  const newHandMulligan = [...prev];
                  newHandMulligan[cards.indexOf(card)] = true;
                  return newHandMulligan;
                });
              } else {
                document.getElementById(card.code).className = 'card';
                setHandMulligan((prev) => {
                  const newHandMulligan = [...prev];
                  newHandMulligan[cards.indexOf(card)] = false;
                  return newHandMulligan;
                });
              }
            }} />
        ))}
      </div>
    </>
  )
}

export default Hand
