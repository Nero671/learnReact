import React from 'react';

export default props => (
  <div style={{
    border: '1px solid #ccc',
    marginBottom: '10px',
    padding: '10px'
  }}>
    <h3>Car name: {props.name}</h3>
    <p>Year: <strong>{props.year}</strong></p>
    <input type="text" value={props.name} onChange={props.onChangeName} />
    <button onClick={props.onDelete}>Delete</button>
  </div>
)