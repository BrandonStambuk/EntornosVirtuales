import React from 'react';
import './QuoteDisplay.css';

const QuoteDisplay = ({ quote }) => {
  return (
    <div className="quote-display">{quote}</div>
  );
}

export default QuoteDisplay;