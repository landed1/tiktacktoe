function Square(props) {
  //set any winning squares to highlight via css

  return (
    <button className={"square "} onClick={props.onClick}>
      {
        //<div className='position-tag'>{props.posi}</div>
      }
      {props.value}
    </button>
  );
}

export default Square;
