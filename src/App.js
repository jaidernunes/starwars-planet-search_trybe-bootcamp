import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <PlanetsProvider>

      <div>PLANETS APP.js</div>
      <MainPage />

    </PlanetsProvider>
  );
}

export default App;
