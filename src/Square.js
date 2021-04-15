function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      <div className='position-tag'>{props.posi}</div>
      {props.value}
    </button>
  );
}

export default Square;
