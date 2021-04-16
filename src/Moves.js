import React from "react";

class Moves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortDirection: false,
    };
  }

  handleClick = () => {
    this.props.sortMovesList(this.state.sortDirection);
    this.setState({
      sortDirection: !this.state.sortDirection,
    });
  };

  render() {
    const moves = this.props.history.concat().map((step, move) => {
      //console.log("step " + step.key + " move " + move);
      //console.log(this.state.sortDirection);
      const desc = move ? "Go to move " + move : "Go to game start";

      const coords = move ? " " + this.props.stepPositions[move - 1] : " ";

      //show current selected step bold

      const isBold = move === this.props.stepNumber ? "selectedStep" : "";

      return (
        <li key={move}>
          <button
            className={isBold}
            onClick={() => {
              this.props.jumpTo(move);
            }}>
            {desc}
          </button>
          <span>{coords}</span>
        </li>
      );
    });

    return (
      <>
        <button className='sort-button' onClick={this.handleClick}>
          Sort Asc Desc
        </button>
        <div>{moves}</div>
      </>
    );
  }
}

export default Moves;
