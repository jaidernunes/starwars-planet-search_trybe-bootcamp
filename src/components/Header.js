import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { setNameFilter,
    setNumericFilter, numericFilter,
    setColumnFilter, columnFilter,
    setComparisonFilter, comparisonFilter,
    setValueFilter, valueFilter } = useContext(PlanetsContext);
  // const [columnFilter, setColumnFilter] = useState('population');
  // const [comparisonFilter, setComparisonFilter] = useState('>');
  // const [valueFilter, setValueFilter] = useState(null);

  return (
    <>
      <div>HEADER.js</div>
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
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ comparisonFilter }
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
            console.log(numericFilter);
          } }
          // disabled={ !valueFilter }
        >
          FILTRAR
        </button>
      </form>
      <div>
        {numericFilter.map((filter, i) => (
          <div key={ `filter${i}` }>
            {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}
          </div>))}
      </div>
    </>

  );
}
