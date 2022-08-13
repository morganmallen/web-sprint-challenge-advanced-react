import React from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const gridArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];




export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.


  state = {
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    activeSquare: 4,
    gridArr: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    xCoord: 2,
    yCoord: 2,
}
  
  updateMoveCount () {
    this.setState({steps: this.state.steps + 1});
  }


  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ 
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      activeSquare: 4,
      xCoord: 2,
      yCoord: 2
    })
  }

  resetEmail = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ 
      email: initialEmail,
    })
  }


   move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    if (direction === 'up') {
      if(this.state.activeSquare - 3 >= 0) {
        this.setState({
          activeSquare: this.state.activeSquare - 3 ,
          message: '',
          yCoord: this.state.yCoord - 1
        }), this.updateMoveCount();
      } else {
        //display message
        this.setState({...this.state, message: "You can't go up"})
      }
    } 
    if (direction === 'down') {
      if(this.state.activeSquare + 3 < this.state.gridArr.length) {
        this.setState({
          activeSquare: this.state.activeSquare + 3,
          message: '',
          yCoord: this.state.yCoord + 1
        }), this.updateMoveCount();
      } else {
        //display message
        this.setState({...this.state, message: "You can't go down"})
    } 
  }
    if (direction === 'left') {
      if(this.state.activeSquare - 1 >= 0 && this.state.activeSquare % 3 !== 0) {
        this.setState({
          activeSquare: this.state.activeSquare - 1,
          message: '',
          xCoord: this.state.xCoord - 1
        }), this.updateMoveCount();
      } else {
        //display message
        this.setState({...this.state, message: "You can't go left"})
      }
    } 
    if (direction === 'right') {
      if(this.state.activeSquare + 1 < this.state.gridArr.length && this.state.activeSquare % 3 !== 2) {
        this.setState({
          activeSquare: this.state.activeSquare + 1,
          message: '',
          xCoord: this.state.xCoord + 1
        }), this.updateMoveCount();
      } else {
        //display message
        this.setState({...this.state, message: "You can't go right"})
      }
    } 
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    this.setState({...this.state, email: value})
  }

  onSubmit = (evt) => {
    const tempObj = {
      x: this.state.xCoord, 
      y: this.state.yCoord, 
      steps: this.state.steps, 
      email: this.state.email
    }
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
    axios.post('http://localhost:9000/api/result', tempObj)
      .then(res => this.setState({message: res.data.message}))
      .catch((err) => this.setState({message: err.response.data.message}))
    this.resetEmail();
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.xCoord}, ${this.state.yCoord})`}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
        {
          gridArr.map(idx => (
            <div key={idx} className={`square${idx === this.state.activeSquare ? ' active' : ''}`}>
              {idx === this.state.activeSquare ? 'B' : null}
            </div>
          ))
        }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
        <button onClick={(e) => this.move(e)} id="left">LEFT</button>
        <button onClick={(e) => this.move(e)} id="up">UP</button>
        <button onClick={(e) => this.move(e)} id="right">RIGHT</button>
        <button onClick={(e) => this.move(e)} id="down">DOWN</button>
        <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form  onSubmit={this.onSubmit}>
          <input id="email" data-testid="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" data-testid="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
