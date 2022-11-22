import React from 'react';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <PlanetsContext.Provider value={ { teste: 'testado' } }>
      <div>PLANETS APP.js</div>
      <MainPage />
    </PlanetsContext.Provider>
  );
}

export default App;
