import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
// import MainPage from './pages/MainPage';

function App() {
  return (
    <PlanetsProvider>
      <>
        {/* <MainPage /> */}
        <Header />
        <Table />
      </>
    </PlanetsProvider>
  );
}

export default App;
