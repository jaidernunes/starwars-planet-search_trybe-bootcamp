import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const datar = useContext(PlanetsContext);

  return (
    <>
      <div>HEADER.js</div>
      <div>{datar.teste}</div>
    </>

  );
}
