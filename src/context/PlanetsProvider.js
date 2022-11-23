import React, { useEffect, useState } from 'react';
// import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
      setFilteredData(planets);
    };

    getAPI();
    // [setData]
  }, []);

  // const omniFilter = useCallback(
  //   ({ target: { id, value } }) => (filteredData.length > 0
  //     ? setFilteredData(filteredData.filter((planet) => planet[id].includes(value)))
  //     : setFilteredData(data.filter((planet) => planet[id].includes(value)))),
  //   [filteredData, data],
  // );

  const omniFilter = ({ target: { id, value } }) => (
    setFilteredData(data.filter((planet) => planet[id].includes(value))));
  // const omniFilter = ({ target: { id, value } }) => (filteredData.length > 0
  //   ? setFilteredData(filteredData.filter((planet) => planet[id].includes(value)))
  //   : setFilteredData(data.filter((planet) => planet[id].includes(value))));

  // [filteredData, data],

  //     ? setFilteredData(filteredData.filter((planet) => planet[type].includes(value)))
  //     : setFilteredData(data.filter((planet) => planet[type].includes(value))));
  // }, [filteredData, data]);
  // const filterName = ({ value }) => {
  //   const fiteredByName = data.filter((planet) => planet.name.includes(value));
  // };

  // solução por Gabriela Ventura. Esclarecido na monitoria da manhã com Aline. 23/11
  // const dataMemo = useMemo(() => ({
  //   data, omniFilter,
  // }), [data, omniFilter]);

  const value = {
    omniFilter,
    data,
    filteredData,
  };

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default PlanetsProvider;
