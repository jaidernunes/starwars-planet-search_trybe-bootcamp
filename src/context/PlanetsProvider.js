import React, { useEffect, useState } from 'react';
// import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const allNumericColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numericFilter, setNumericFilter] = useState([]);
  const [filtrableColumns, setFiltrableColumns] = useState(allNumericColumns);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const getAPI = async () => {
      const apiData = await planetsAPI();
      // console.log(apiData);
      const apiResults = apiData.results;
      const planets = apiResults.map((planet) => {
        delete planet.residents;
        return planet;
      });
      // console.log(planets);
      setData(planets);
      setFilteredData(planets);
    };

    getAPI();
  }, []);

  useEffect(() => {
    const eachNumFilter = () => {
      let tempData = data;
      // console.log(tempData);

      tempData = tempData.filter((planet) => planet.name.includes(nameFilter));

      numericFilter.forEach((numFilter) => {
        // console.log(numFilter.comparisonFilter);
        if (numFilter.comparisonFilter === 'maior que') {
          tempData = tempData.filter(
            (planet) => (Number(planet[numFilter.columnFilter])
            > Number(numFilter.valueFilter)
            && planet[numFilter.columnFilter] !== 'unknown'),
          );
        }
        if (numFilter.comparisonFilter === 'menor que') {
          tempData = tempData.filter(
            (planet) => (Number(planet[numFilter.columnFilter])
            < Number(numFilter.valueFilter)
            && planet[numFilter.columnFilter] !== 'unknown'),
          );
        }
        if (numFilter.comparisonFilter === 'igual a') {
          tempData = tempData.filter(
            (planet) => (Number(planet[numFilter.columnFilter])
            === Number(numFilter.valueFilter)
            && planet[numFilter.columnFilter] !== 'unknown'),
          );
        }
      });

      setColumnFilter(filtrableColumns[0]);
      setFilteredData(tempData);
      // console.log(tempData);
    };
    eachNumFilter();
  }, [nameFilter, numericFilter, filtrableColumns]);

  const sortTable = () => {
    const unknowns = filteredData.filter((column) => column[sortColumn] === 'unknown');
    const numerics = filteredData.filter((column) => column[sortColumn] !== 'unknown');
    if (sortType === 'ASC') {
      numerics.sort((a, b) => Number(a[sortColumn]) - Number(b[sortColumn]));
      setFilteredData([...numerics, ...unknowns]);
    }
    if (sortType === 'DESC') {
      numerics.sort((b, a) => Number(a[sortColumn]) - Number(b[sortColumn]));
      setFilteredData([...numerics, ...unknowns]);
    }
  };

  const providerProps = {
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
    filtrableColumns,
    setFiltrableColumns,
    allNumericColumns,
    setSortColumn,
    setSortType,
    sortTable,
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
