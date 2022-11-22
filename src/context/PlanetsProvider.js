import React, { useEffect, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const apiData = await planetsAPI();
      console.log(apiData);
      setData(apiData);
    };

    getAPI();
  }, [setData]);

  return (
    <PlanetsContext.Provider value={ data }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.arrayOf(element).isRequired,
});
