import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { omniFilter } = useContext(PlanetsContext);

  return (
    <>
      <div>HEADER.js</div>
      <form action="">
        <input
          type="text"
          data-testid="name-filter"
          name="nameFilter"
          id="name"
          onChange={ omniFilter }
        />
      </form>
    </>

  );
}
