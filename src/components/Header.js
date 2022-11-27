import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { allNumericColumns, setNameFilter, sortTable,
    setNumericFilter, numericFilter,
    setColumnFilter, columnFilter,
    setComparisonFilter, comparisonFilter,
    setValueFilter, valueFilter,
    filtrableColumns, setFiltrableColumns,
    setSortColumn, setSortType } = useContext(PlanetsContext);
  // const [columnFilter, setColumnFilter] = useState('population');
  // const [comparisonFilter, setComparisonFilter] = useState('>');
  // const [valueFilter, setValueFilter] = useState(null);

  // const filteredColumns = numericFilter.map((numFilter) => numFilter.columnFilter);
  // console.log(filteredColumns);

  return (
    <>
      <form action="">
        <input
          type="text"
          data-testid="name-filter"
          name="nameFilter"
          id="name"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
        <br />

        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          value={ columnFilter }
          onChange={ ({ target }) => setColumnFilter(target.value) }
          // onSelect={ ({ target }) => setColumnFilter(target.value) }
        >
          {/* {!filteredColumns.includes('population')
          && <option value="population">population</option>}
          {!filteredColumns.includes('orbital_period')
          && <option value="orbital_period">orbital_period</option>}
          {!filteredColumns.includes('diameter')
          && <option value="diameter">diameter</option>}
          {!filteredColumns.includes('rotation_period')
          && <option value="rotation_period">rotation_period</option>}
          {!filteredColumns.includes('surface_water')
          && <option value="surface_water">surface_water</option>} */}
          {filtrableColumns.map((column) => (
            <option key={ column }>{column}</option>
          ))}
        </select>

        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          // value={ comparisonFilter }
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          name="valueFilter"
          id="valueFilter"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setNumericFilter([...numericFilter,
              { columnFilter, comparisonFilter, valueFilter }]);
            // console.log(numericFilter);
            setFiltrableColumns(filtrableColumns.filter(
              (column) => column !== columnFilter,
            ));
          } }
          // disabled={ !valueFilter }
        >
          FILTRAR
        </button>
      </form>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setNumericFilter([]);
          setFiltrableColumns(allNumericColumns);
        } }
      >
        REMOVER FILTROS

      </button>

      <select
        data-testid="column-sort"
        name="columnSort"
        id="columnSort"
        onChange={ ({ target }) => setSortColumn(target.value) }
      >
        {allNumericColumns.map((column) => (
          <option key={ `sort${column}` }>{column}</option>
        ))}
      </select>
      <label htmlFor="sortAsc">
        <input
          type="radio"
          name="sortType"
          id="sortAsc"
          data-testid="column-sort-input-asc"
          onClick={ () => setSortType('ASC') }
        />
        Ascendente
      </label>
      <label htmlFor="sortDesc">
        <input
          type="radio"
          name="sortType"
          id="sortDesc"
          data-testid="column-sort-input-desc"
          onClick={ () => setSortType('DESC') }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortTable }
      >
        ORDENAR
      </button>

      <div>
        {numericFilter.map((filter, i) => (
          <div
          // key={ `filter${i}` }
            key={ i }
            data-testid="filter"
          >
            {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}

            <button
              id={ filter.columnFilter }
              type="button"
              onClick={ ({ target }) => {
                console.log(target.id);
                setNumericFilter(numericFilter.filter(
                  (numFilter) => numFilter.columnFilter !== target.id,
                  setFiltrableColumns([target.id, ...filtrableColumns]),
                ));
              } }
            >
              DEL

            </button>
          </div>
        ))}
      </div>
    </>

  );
}
