import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
// import MainPage from './pages/MainPage';

function App() {
  return (
    <PlanetsProvider>
      {/* <MainPage /> */}
      <Table />
    </PlanetsProvider>
  );
}

export default App;
