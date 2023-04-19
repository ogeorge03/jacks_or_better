import React from 'react'
import { useEffect } from 'react';

function Hand({cards, setHandMulligan, setNumMulligan}) {

  // if cards have changed set all classes to card

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      document.getElementById(cards[i].code).className = 'card';
    }
    setNumMulligan(0);
  }, [cards, setNumMulligan]);


  return (
    <>
      <div className="container hand">
        {cards.map((card) => (
          <img src={card.image} alt={card.code} id={card.code} key={card.code} className='card' onClick={
            () => {
              if (document.getElementById(card.code).className === 'card') {
                document.getElementById(card.code).className = 'card mulligan';
                setHandMulligan((prev) => {
                  const newHandMulligan = [...prev];
                  newHandMulligan[cards.indexOf(card)] = true;
                  return newHandMulligan;
                });
                setNumMulligan((prev) => prev + 1);
              } else {
                document.getElementById(card.code).className = 'card';
                setHandMulligan((prev) => {
                  const newHandMulligan = [...prev];
                  newHandMulligan[cards.indexOf(card)] = false;
                  return newHandMulligan;
                });
                setNumMulligan((prev) => prev - 1);
              }
            }} />
        ))}
      </div>
    </>
  )
}

export default Hand
