
import React from 'react';
import './Card.css';

export const Card: React.FunctionComponent = (props) => {
  return (
    <div className="Card">{ props.children }</div>
  );
}