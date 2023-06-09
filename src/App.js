import Hand from './Hand';
import Mulligan from './Mulligan';
import Payouts from './Payouts';
import Winnings from './Winnings';
import Login from './Login';
import Register from './Register';
import {Alert, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Leaderboard from './Leaderboard';
import formatMoney from './formatMoney';



function App() {

  // Deck api = https://deckofcardsapi.com/

  const [deckID, setDeckID] = useState('');
  const [hand, setHand] = useState([]);
  const [handMulligan, setHandMulligan] = useState([false, false, false, false, false]);
  const [numMulligan, setNumMulligan] = useState(0);
  const [money, setMoney] = useState(-1);
  const [bet, setBet] = useState(0);
  const [checkHand, setCheckHand] = useState(false);
  const [newDeck, setNewDeck] = useState(false);
  const [restart, setRestart] = useState(false);
  const [username, setUsername] = useState('');
  const [restarts, setRestarts] = useState(0);
  const [newAccount, setNewAccount] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const [accessToken, setAccessToken] = useState(localStorage.getItem('auth-token-access'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('auth-token-refresh'));
  const [, setIsAdmin] = useState(false);

  // Set money to users money in the database on first load
  useEffect(() => {
    async function getMoney() {
      if (accessToken === null) return;
      try {
        const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER }/getMoney`, {
          username: username
        }, {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        });
        setMoney(res.data.money.$numberDecimal);
        setHighScore(res.data.high_score.$numberDecimal);
        setAccessToken(res.headers['auth-token-access']);
        setRefreshToken(res.headers['auth-token-refresh']);
      } catch (error) {
        console.log(error);
      }
    }
    getMoney();
  }, [accessToken, refreshToken, username]);

  useEffect(() => {
    async function getRestarts() {
      if (accessToken === null) return;
      try {
        const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/getRestarts`, {
          username: username
        }, {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        });
        setRestarts(res.data.restarts);
        setAccessToken(res.headers['auth-token-access']);
        setRefreshToken(res.headers['auth-token-refresh']);
      } catch (error) {
        console.log(error);
      }
    }
    getRestarts();
  }, [accessToken, refreshToken, username]);



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

  // Whenever money changes, update the database
  useEffect(() => {
    async function updateMoney() {
      if (money === -1) return;
      if (accessToken === null) return;
      try {
        const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/updateMoney`, {
          money: money,
          username: username
        }, {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        });
        setAccessToken(res.headers['auth-token-access']);
        setRefreshToken(res.headers['auth-token-refresh']);
      } catch (error) {
        console.log(error);
      }
    }
    updateMoney();
  }, [money, accessToken, refreshToken, setAccessToken, setRefreshToken, username]);

  useEffect(() => {
    // if money > high score, update high score
    if (money > highScore) {
      setHighScore(money);
    }
  }, [money, highScore, setHighScore]);

const handleRestart = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/restart`, {
      username: username
    }, {
      headers: {
        'auth-token-access': accessToken,
        'auth-token-refresh': refreshToken
      }
    });
    setMoney(100);
    setAccessToken(res.headers['auth-token-access']);
    setRefreshToken(res.headers['auth-token-refresh']);
    setHandMulligan([false, false, false, false, false]);
    setNumMulligan(0);
    setRestart(false);
    setRestarts(restarts + 1);
    setNewDeck(true);
    setBet(0);
    setCheckHand(false);
  } catch (error) {
      console.log(error);
  }
}

const handleLogout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/logout`, {
      username: username
    }, {
      headers: {
        'auth-token-access': accessToken,
        'auth-token-refresh': refreshToken
      }
    });
    setAccessToken(null);
    setRefreshToken(null);
    setHandMulligan([false, false, false, false, false]);
    setNumMulligan(0);
    setIsAdmin(false);
    setUsername('');
    setBet(0);
    setNewDeck(true);
    setRestart(false);
    setRestarts(0);
    setCheckHand(false);
  } catch (error) {
      console.log(error);
  }
}

const handleInput = () => {
  // Add commas to make it more readable
  // ex: 1000 -> 1,000 and 1000000 -> 1,000,000
  // also put $ in front
  const input = document.getElementById("betInput");
  input.value = input.value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  input.value = input.value.replace(/\$/g, "");
  input.value = "$" + input.value;
}






  // Return all the card images (png)
  return (
    <>
    <Alert id="game-title">Jacks Or Better</Alert>
    <Payouts />
    <Leaderboard />
    {accessToken === null ? (
      <>
      <div className="login-register">
        {newAccount === false ? (
          <>
        <Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setIsAdmin={setIsAdmin} setUser={setUsername} setNewAccount={setNewAccount} />
        </>
        ) : (
        <Register setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setNewAccount={setNewAccount} setUser={setUsername} />
        )}
      </div>
      </>) : (
    <>
    <Button variant="primary" id="logout-btn" onClick={handleLogout}>Logout</Button>
    {(restart === false) && (money + bet !== 0) ? (
      <>
      <h2 id="money-title">Money: ${formatMoney(money)} <br/> High Score: ${formatMoney(highScore)}</h2>
      {bet === 0 && <h2 id="restarts-title">Restarts: {restarts}</h2>}
      {bet !== 0 && <h2 id="bet-title">Bet: ${formatMoney(bet)}</h2>}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> 
      {/* if bet = 0 show bet container else show cards */}
      {bet === 0 ? (
        <div className="container">
          <div className="betContainer">
            <h2>Place a bet</h2>
            {/* number field */}
            <Form.Control id='betInput' type="text" min="1" max={money} step="1" pattern="\d*" onInput={handleInput}></Form.Control>
            {/* bet button */}
            <Button variant="primary" size="lg" onClick={() => {

              // remove commas from input
              const value = document.querySelector("input").value.replace(/,/g, "").replace(/\$/g, "");
              

              if (value === "") {
                document.querySelector("#betError").innerHTML = "Please enter a bet";
                return;
              }

              // if not a number
              if (isNaN(value)) {
                document.querySelector("#betError").innerHTML = "Please enter a valid bet";
                return;
              }

              if (Number(value) > money) {
                document.querySelector("#betError").innerHTML = "You don't have enough money";
                return;
              }
              if (Number(value) < 1) {
                document.querySelector("#betError").innerHTML = "Please enter a valid bet";
                return;
              }
              if (Number(value) % 1 !== 0) {
                document.querySelector("#betError").innerHTML = "Bet must be a whole number";
                return;
              }

              setBet(Number(value));
              setMoney((prev) => prev - Number(value));
            }}>Bet</Button>
          <Alert variant="danger" id="betError"></Alert>
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
             setNewDeck={setNewDeck} setRestart={setRestart} />
          )}
    </>
  )
}</>) : (
  <div className="container game-over">
    <h1>Game Over</h1>
    <h1>No more money</h1>
    <Button onClick={() => handleRestart()}>Restart?</Button>
    </div>
)
}

</>
      )}
</>
);
}

export default App;