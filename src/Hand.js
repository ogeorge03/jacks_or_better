import React from 'react'

function Hand({cards}) {
  return (
    <>
      <div className="container">
        {cards.map((card) => (
          <img key={card.code} src={card.image} alt={card.code} />
        ))}
      </div>
    </>
  )
}

export default Hand
