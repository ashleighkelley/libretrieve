import React, { useState } from 'react';
import Books from './Books';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //need to pass items from query?
  const [pastPicks, setPastPicks] = useState([]);
  const [pastSuggestions, setPastSuggestions] = useState([]);

  const getPicks = () => {
    
    fetch('*/pastPicks')
      .then(res => res.json())
      .then(picks => {
        console.log(JSON.stringify(res));
      });

    setPastPicks();
  };

  const getSuggestions = () => {
    setPastSuggestions();
  };

  return (
      <main>
        <div className="title">
          <h1>Creature Club Book Club</h1>
          <div className="underline"></div>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="menu-btn"
            onClick={() => getPicks()}
          >Past Picks</button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => getSuggestions()}
          >Past Suggestions</button>
        </div>

        
        <Books items={pastPicks} />
      </main>
  );
}

export default App;
