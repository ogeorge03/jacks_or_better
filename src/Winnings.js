import React from 'react'
import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import formatMoney from './formatMoney';

function checkWinnings(cards) {
  let cardValues = [];
  let cardSuits = [];
  for (let i = 0; i < cards.length; i++) {

    if (cards[i].value === 'JACK') {
      cardValues.push(11);
    } else if (cards[i].value === 'QUEEN') {
      cardValues.push(12);
    } else if (cards[i].value === 'KING') {
      cardValues.push(13);
    } else if (cards[i].value === 'ACE') {
      cardValues.push(14);
    } else {
      cardValues.push(parseInt(cards[i].value));
    }

    cardSuits.push(cards[i].suit);
  }

  let sortedValues = cardValues.slice().sort((a, b) => a - b);



  // values in asending order = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] (11 = J, 12 = Q, 13 = K, 14 = A)
  // suits = [C, D, H, S]

  // check for royal flush
  if (cardValues.includes(10) && cardValues.includes(11) && cardValues.includes(12) && cardValues.includes(13) && cardValues.includes(14)) {
    if (cardSuits.every((suit) => suit === cardSuits[0])) {
      return 250;
    }
  }

  // check for straight flush
  if (cardSuits.every((suit) => suit === cardSuits[0])) {
    // sort values then check for straight
    if (sortedValues[0] + 1 === sortedValues[1] && sortedValues[1] + 1 === sortedValues[2] && sortedValues[2] + 1 === sortedValues[3] && sortedValues[3] + 1 === sortedValues[4]) {
      return 50;
    }
  }

  // check for four of a kind
  if (sortedValues[0] === sortedValues[1] && sortedValues[1] === sortedValues[2] && sortedValues[2] === sortedValues[3]) { // 4 of a kind in first 4 cards
    return 25;
  } else if (sortedValues[1] === sortedValues[2] && sortedValues[2] === sortedValues[3] && sortedValues[3] === sortedValues[4]) { // 4 of a kind in last 4 cards
    return 25;
  }

  // check for full house
  if (sortedValues[0] === sortedValues[1] && sortedValues[1] === sortedValues[2] && sortedValues[3] === sortedValues[4]) { // 3 of a kind + pair
    return 9;
  } else if (sortedValues[0] === sortedValues[1] && sortedValues[2] === sortedValues[3] && sortedValues[3] === sortedValues[4]) { // pair + 3 of a kind
    return 9;
  }

  // check for flush
  if (cardSuits.every((suit) => suit === cardSuits[0])) {
    return 6;
  }

  // check for straight
  if (sortedValues[0] + 1 === sortedValues[1] && sortedValues[1] + 1 === sortedValues[2] && sortedValues[2] + 1 === sortedValues[3] && sortedValues[3] + 1 === sortedValues[4]) {
    return 4;
  }

  // check for three of a kind
  if (sortedValues[0] === sortedValues[1] && sortedValues[1] === sortedValues[2]) { // 3 of a kind in first 3 cards
    return 3;
  } else if (sortedValues[1] === sortedValues[2] && sortedValues[2] === sortedValues[3]) { // 3 of a kind in middle 3 cards
    return 3;
  } else if (sortedValues[2] === sortedValues[3] && sortedValues[3] === sortedValues[4]) { // 3 of a kind in last 3 cards
    return 3;
  }

  // check for two pair
  if (sortedValues[0] === sortedValues[1] && sortedValues[2] === sortedValues[3]) { // 2 pair in first 4 cards
    return 2;
  } else if (sortedValues[0] === sortedValues[1] && sortedValues[3] === sortedValues[4]) { // 2 pair in first and last cards
    return 2;
  } else if (sortedValues[1] === sortedValues[2] && sortedValues[3] === sortedValues[4]) { // 2 pair in last 4 cards
    return 2;
  }

  // check for pair of jacks or better
  if (sortedValues[0] === sortedValues[1] && sortedValues[0] >= 11) { // pair of jacks or better in first 2 cards
    return 1;
  } else if (sortedValues[1] === sortedValues[2] && sortedValues[1] >= 11) { // pair of jacks or better in middle 2 cards
    return 1;
  } else if (sortedValues[2] === sortedValues[3] && sortedValues[2] >= 11) { // pair of jacks or better in last 2 cards
    return 1;
  } else if (sortedValues[3] === sortedValues[4] && sortedValues[3] >= 11) { // pair of jacks or better in last 2 cards
    return 1;
  }

  // no winning hand
  return 0;
}


function Winnings({cards, bet, setBet, money, setMoney, setCheckHand, setNewDeck, setRestart}) {

  const [winnings, setWinnings] = useState(0);
  const [winningsMessage, setWinningsMessage] = useState('');

  useEffect(() => {
    setWinnings(checkWinnings(cards) * bet);

    if (checkWinnings(cards) === 0) {
      setWinningsMessage('No Winning Hand. Better luck next time!');
    } else if (checkWinnings(cards) === 1) {
      setWinningsMessage('Pair of Jacks or Better!');
    } else if (checkWinnings(cards) === 2) {
      setWinningsMessage('Two Pair!');
    } else if (checkWinnings(cards) === 3) {
      setWinningsMessage('Three of a Kind!');
    } else if (checkWinnings(cards) === 4) {
      setWinningsMessage('Straight!');
    } else if (checkWinnings(cards) === 6) {
      setWinningsMessage('Flush!');
    } else if (checkWinnings(cards) === 9) {
      setWinningsMessage('Full House!');
    } else if (checkWinnings(cards) === 25) {
      setWinningsMessage('Four of a Kind!');
    } else if (checkWinnings(cards) === 50) {
      setWinningsMessage('Straight Flush!');
    } else if (checkWinnings(cards) === 250) {
      setWinningsMessage('Royal Flush!');
    }

    if (winnings > 0) {
      setMoney((prevMoney) => prevMoney + winnings + bet);
    }



  }, [cards, bet, setBet, setMoney, winnings])



  // show cards
  return (
    <>
      <div className="container">
        <div className="hand">
          {cards.map((card) => (
            <img src={card.image} alt={card.code} id={card.code} key={card.code} className='card' />
          ))}
        </div>
      </div>
      <br /> <br />
      <Alert variant={winningsMessage !== "No Winning Hand. Better luck next time!" ? "success" : "warning"}>{winningsMessage}</Alert>
      <Alert variant={winnings === 0 ? "warning" : "success"}>You bet ${formatMoney(bet)} {winnings === 0 ? `and lost all of it.` : `and won a total of $${formatMoney(winnings + bet)}! (Original bet + Payout)`}</Alert>
      <div id="play-quit-ctn">
      {money !== 0  &&
      <Button id="play-again-btn" onClick={
        () => {
          setCheckHand(false);
          setBet(0);
          setNewDeck(true)
        }
      }
      >Play Again?</Button>
      }
      {money === 0 && <><Alert id="loser" variant="danger">You're out of money! Probably time to take a break.</Alert>
        <Button id="restart-btn" onClick={() => setRestart(true)}>Restart</Button></>
      }
      {money !== 0 &&
      <Button id="quit-btn" onClick={() => window.location.reload()}
      >Quit</Button>
      }
      </div>
    </>
  )
}

export default Winnings
