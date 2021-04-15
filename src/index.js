import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board";
import Moves from "./Moves";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
      stepPositions: [],
    };
  }

  jumpTo = (which) => {
    this.setState({
      stepNumber: which,
      xIsNext: which % 2 === 0,
    });
  };

  sortMovesList = () => {
    let cStepPositions, cHistory;
    cStepPositions = this.state.stepPositions.concat().reverse();
    cHistory = this.state.history.concat().reverse();
    this.setState({
      stepPositions: cStepPositions,
      history: cHistory,
    });
  };

  handleClick = (i, posi) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cSquares = current.squares.slice();
    //We need to remove 'future' state if we took a step back and recreated new moves
    const cStepPositions = this.state.stepPositions
      .slice(0, this.state.stepNumber)
      .concat([posi]);

    //check to see if a square has not been clicked or a win has not yet happened.
    if (calculateWinner(cSquares) || cSquares[i]) {
      return;
    }
    cSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: cSquares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      stepPositions: cStepPositions,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;

    if (winner) {
      status = "Winnner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "0");
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ul>
            <Moves
              history={history}
              stepPositions={this.state.stepPositions}
              stepNumber={this.state.stepNumber}
              jumpTo={this.jumpTo}
              sortMovesList={this.sortMovesList}
            />
          </ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
/*
const aPos = [
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [1, 3],
  [2, 3],
  [3, 3],
]; 

let a = Array()
  .fill(0)
  .map((x) => Array(10).fill(0));

console.log(a);*/

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //check each line to see if they have the same type (X or O)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
