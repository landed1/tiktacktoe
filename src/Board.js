import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i, posi) {
    if (this.props.winner) {
      console.log(this.props.winner.winningSet);
      let [a, b, c] = this.props.winner.winningSet;
      for (var i = 0; i < 9; i++) {
        if (a === i) {
          console.log("first square is ", i);
        }
        if (b === i) {
          console.log("second square is ", i);
        }
        if (c === i) {
          console.log("third square is ", i);
        }
      }
    }

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, posi)}
        posi={posi ? posi[0] + " , " + posi[1] : ""}
        winner={this.props.winner}
      />
    );
  }

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0, [1, 1])}
          {this.renderSquare(1, [2, 1])}
          {this.renderSquare(2, [3, 1])}
        </div>
        <div className='board-row'>
          {this.renderSquare(3, [1, 2])}
          {this.renderSquare(4, [2, 2])}
          {this.renderSquare(5, [3, 2])}
        </div>
        <div className='board-row'>
          {this.renderSquare(6, [1, 3])}
          {this.renderSquare(7, [2, 3])}
          {this.renderSquare(8, [3, 3])}
        </div>
      </div>
    );
  }
}

export default Board;
