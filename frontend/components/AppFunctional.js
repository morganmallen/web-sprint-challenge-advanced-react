import React, {useState} from 'react'
import axios from 'axios';
// Suggested initial states
// the index the "B" is at const 

  


export default function AppFunctional(props) {
  const gridArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [moveCount, setMoveCount] = useState(0);
  const [activeSquare, setActiveSquare] = useState(4);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [xCoord, setXCoord] = useState(2);
  const [yCoord, setYCoord] = useState(2);


  const updateMoveCount = () => {
    setMoveCount(moveCount + 1);
  }

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const reset =  () => {
    // Use this helper to reset all states to their initial values.
    setMessage('');
    setXCoord(2);
    setYCoord(2);
    setActiveSquare(4);
    setMoveCount(0);
    setEmail('');
  }

  const resetEmail =  () => {
    setEmail('');
  }

  const move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    if (direction === 'up') {
      if(activeSquare - 3 >= 0) {
        setActiveSquare(activeSquare - 3);
        setYCoord(yCoord - 1);
        updateMoveCount();
      } else {
        //display message
        setMessage("You can't go up");        
      }
    } else if (direction === 'down') {
      if(activeSquare + 3 < gridArr.length) {
        setActiveSquare(activeSquare + 3);
        setYCoord(yCoord + 1); 
        updateMoveCount();
      } else {
        //display message
        setMessage("You can't go down");        

      }
    } else if (direction === 'left') {
      if(activeSquare - 1 >= 0 && activeSquare % 3 !== 0) {
        setActiveSquare(activeSquare - 1);
        setXCoord(xCoord - 1);
        updateMoveCount();
      } else {
        //display message
        setMessage("You can't go left");        

      }
    } else if (direction === 'right') {
      if (activeSquare + 1 < gridArr.length && activeSquare % 3 !== 2) {
        setActiveSquare(activeSquare + 1);
        setXCoord(xCoord + 1);
        updateMoveCount();
        } else {
          //display message
          setMessage("You can't go right");        

        }
    }
    
  }

  const onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    setEmail(value);
  }

  const onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    const tempObj = {
      x: xCoord, 
      y: yCoord, 
      steps: moveCount, 
      email: email
    }
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
    axios.post('http://localhost:9000/api/result', tempObj)
      .then(res => setMessage(res.data.message))
      .catch((err) => setMessage(err.response.data.message))
      resetEmail();
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${xCoord}, ${yCoord})`}</h3>
        <h3 id="steps">You moved {moveCount} {moveCount === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          gridArr.map(idx => (
            <div key={idx} className={`square${idx === activeSquare ? ' active' : ''}`}>
              {idx === activeSquare ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => move(e)} id="left">LEFT</button>
        <button onClick={(e) => move(e)} id="up">UP</button>
        <button onClick={(e) => move(e)} id="right">RIGHT</button>
        <button onClick={(e) => move(e)} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email} ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
