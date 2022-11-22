import React, { useEffect, useState } from 'react';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const planetsData = await planetsAPI();
  }, []);

  return (
    <PlanetsContext.Provider>
      {children}
    </PlanetsContext.Provider>
  );
}
