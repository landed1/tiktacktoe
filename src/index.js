import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  jumpTo = (which) => {
    this.setState({
      stepNumber: which,
      xIsNext: which % 2 === 0,
    });
  };

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cSquares = current.squares.slice();
    //check to see if a square has not been clicked or a win has not yet happened.
    if (calculateWinner(cSquares) || cSquares[i]) {
      return;
    }
    cSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: cSquares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move " + move : "Go to game start";

      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}>
            {desc}
          </button>
        </li>
      );
    });

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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
    //console.log("checking", lines[i]);
    //console.log(a);
    //console.log(squares[a] && squares[a]);
    //console.log(squares[a], squares[b], squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //if ((squares[a] === squares[b]) === squares[c]) {
      //console.log("winner found", lines[i]);
      return squares[a];
    }
  }
  return null;
}
