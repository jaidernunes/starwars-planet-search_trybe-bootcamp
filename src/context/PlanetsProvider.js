import React, { useEffect, useState } from 'react';
// import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numericFilter, setNumericFilter] = useState([]);

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
  }, []);

  // const omniFilter = ({ target: { id, value } }) => (
  //   setFilteredData(data.filter((planet) => planet[id].includes(value))));
  // const eachNumFilter = () => {
  //   let tempData = filteredData;
  //   numericFilter.forEach((numFilter) => {
  //     tempData = tempData.filter((planet) => planet[numFilter.columnFilter]
  //   > numFilter.valueFilter);
  //   });
  //   setFilteredData(tempData);
  // };
  // solução por Gabriela Ventura. Esclarecido na monitoria da manhã com Aline. 23/11
  // const dataMemo = useMemo(() => ({
  //   data, omniFilter,
  // }), [data, omniFilter]);

  // columnFilter, comparisonFilter, valueFilter

  useEffect(() => {
    const eachNumFilter = () => {
      let tempData = filteredData;
      console.log(tempData);

      tempData = tempData.filter((planet) => planet.name.includes(nameFilter));

      numericFilter.forEach((numFilter) => {
        console.log(numFilter.comparisonFilter);
        console.log(numFilter.comparisonFilter);
        if (numFilter.comparisonFilter === 'maior que') {
          tempData = tempData.filter(
            (planet) => planet[numFilter.columnFilter] > numFilter.valueFilter
            && planet[numFilter.columnFilter] !== 'unknown',
          );
        }
        if (numFilter.comparisonFilter === 'menor que') {
          tempData = tempData.filter(
            (planet) => planet[numFilter.columnFilter] < numFilter.valueFilter
            && planet[numFilter.columnFilter] !== 'unknown',
          );
        }
        if (numFilter.comparisonFilter === 'igual a') {
          tempData = tempData.filter(
            (planet) => planet[numFilter.columnFilter] === numFilter.valueFilter
            && planet[numFilter.columnFilter] !== 'unknown',
          );
        }
      });

      setFilteredData(tempData);
      console.log(tempData);
    };
    eachNumFilter();
  }, [nameFilter, numericFilter]);

  const providerProps = {
    // omniFilter,
    data,
    filteredData,
    nameFilter,
    setNameFilter,
    numericFilter,
    setColumnFilter,
    columnFilter,
    setComparisonFilter,
    comparisonFilter,
    setValueFilter,
    valueFilter,
    setNumericFilter,
    // eachNumFilter,
  };

  return (
    <PlanetsContext.Provider value={ providerProps }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default PlanetsProvider;
