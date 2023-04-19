import React from 'react'

function Hand({cards, setHandMulligan}) {



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
