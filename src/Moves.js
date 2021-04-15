function Moves(props) {


    // TODO Provide a sorting option with a toggle.
    
  const moves = props.history.map((step, move) => {
    const desc = move ? "Go to move " + move : "Go to game start";

    const coords = move ? " " + props.stepPositions[move - 1] : " ";

    //show current selected step bold

    const isBold = move === props.stepNumber ? "selectedStep" : "";

    return (
      <li key={move}>
        <button
          className={isBold}
          onClick={() => {
            props.jumpTo(move);
          }}>
          {desc}
        </button>
        <span>{coords}</span>
      </li>
    );
  });

  return <div>{moves}</div>;
}

export default Moves;
