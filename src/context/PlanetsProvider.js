import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getAPI = async () => {
      const apiData = await planetsAPI();
      // console.log(apiData);
      const apiResults = apiData.results;
      const planets = apiResults.map((planet) => {
        delete planet.residents;
        return planet;
      });
      console.log(planets);
      setData(planets);
    };

    getAPI();
  }, []);

  // solução por Gabriela Ventura. Na monitoria da noite não conseguimos descobrir pq nao funciona sem isso.
  const dataMemo = useMemo(() => ({
    data,
  }), [data]);

  return (
    <PlanetsContext.Provider value={ dataMemo }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default PlanetsProvider;
