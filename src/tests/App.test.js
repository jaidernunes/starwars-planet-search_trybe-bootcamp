import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from './mocks/testData'
// import fetchAPI from '../services/planetsAPI'
import PlanetsProvider from '../context/PlanetsProvider'
import userEvent from '@testing-library/user-event';


describe('I am your test 1', () => {
  // mock code from https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('checks if the API is called on page load', () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>)

    expect(global.fetch).toHaveBeenCalled();
  })

  it('checks if the table header is rendered correctly', () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>)

    const columnName = screen.getByRole('columnheader', {  name: /name/i});
    const columnRotation = screen.getByRole('columnheader', {  name: /rotation period/i});
    const columnOrbital = screen.getByRole('columnheader', {  name: /orbital period/i});
    const columnDiameter = screen.getByRole('columnheader', {  name: /diameter/i});
    const columnClimate = screen.getByRole('columnheader', {  name: /climate/i});
    const columnGravity = screen.getByRole('columnheader', {  name: /gravity/i});
    const columnTerrain = screen.getByRole('columnheader', {  name: /terrain/i});
    const columnSurface = screen.getByRole('columnheader', {  name: /surface water/i});
    const columnPopulation = screen.getByRole('columnheader', {  name: /population/i});

    expect(columnName).toBeInTheDocument()
    expect(columnRotation).toBeInTheDocument()
    expect(columnOrbital).toBeInTheDocument()
    expect(columnDiameter).toBeInTheDocument()
    expect(columnClimate).toBeInTheDocument()
    expect(columnGravity).toBeInTheDocument()
    expect(columnTerrain).toBeInTheDocument()
    expect(columnSurface).toBeInTheDocument()
    expect(columnPopulation).toBeInTheDocument()
  });
  
  it('checks if the name filter is working as expected', async() => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>)

      const textbox = screen.getByRole('textbox');
      const tatooine = await screen.findByText(/tatooine/i);
      const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});

      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();

      userEvent.click(textbox);
      userEvent.type(textbox, 'aa');

      expect(tatooine).not.toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
    });

  it('checks if the  remove filters button and the > filter are working as expected', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>)
      const tatooine = await screen.findByRole('cell', {  name: /tatooine/i});
      const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});
      const yavinIV = await screen.findByRole('cell', {  name: /yavin iv/i});
      const numberInput = screen.getByRole('spinbutton');
      const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
      const removeAllFiltersBtn = screen.getByRole('button', {  name: /remover filtros/i});
      
      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
      
      userEvent.clear(numberInput);
      userEvent.type(numberInput, '200000');
      userEvent.click(filterBtn);
      
      expect(alderaan).toBeInTheDocument();
      expect(tatooine).not.toBeInTheDocument();
      
      userEvent.click(removeAllFiltersBtn);
      const tatooine2 = await screen.findByText(/tatooine/i);
      expect(tatooine2).toBeInTheDocument();
  });
    
  it('checks if the < filter is working as expected', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>)
      const tatooine = await screen.findByRole('cell', {  name: /tatooine/i});
      const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});
      const yavinIV = await screen.findByRole('cell', {  name: /yavin iv/i});
      const numberInput = screen.getByRole('spinbutton');
      const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      
      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
      
      userEvent.selectOptions(columnFilter, 'orbital_period');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.clear(numberInput);
      userEvent.type(numberInput, '400');
      userEvent.click(filterBtn);
      
      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).not.toBeInTheDocument();
  });
    
  it('checks if the === filter is working as expected', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>)
      const tatooine = await screen.findByRole('cell', {  name: /tatooine/i});
      const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});
      const yavinIV = await screen.findByRole('cell', {  name: /yavin iv/i});
      const numberInput = screen.getByRole('spinbutton');
      const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      
      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
      
      userEvent.selectOptions(columnFilter, 'rotation_period');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.clear(numberInput);
      userEvent.type(numberInput, '24');
      userEvent.click(filterBtn);
      
      expect(tatooine).not.toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
  });
    
  it('checks if the numeric filters work correctly when applying more than one', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>)
      const tatooine = await screen.findByRole('cell', {  name: /tatooine/i});
      const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});
      const yavinIV = await screen.findByRole('cell', {  name: /yavin iv/i});
      const numberInput = screen.getByRole('spinbutton');
      const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      
      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
      
      userEvent.selectOptions(columnFilter, 'rotation_period');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.clear(numberInput);
      userEvent.type(numberInput, '24');
      userEvent.click(filterBtn);
      
      expect(tatooine).not.toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
      
      userEvent.clear(numberInput);
      userEvent.type(numberInput, '1000');
      userEvent.click(filterBtn);
      
      expect(tatooine).not.toBeInTheDocument();
      expect(alderaan).not.toBeInTheDocument();
      expect(yavinIV).toBeInTheDocument();
  });
    
  it('checks if the asc and desc order functions are working as expected', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>)

    let orderedPlanets = [];
    const asc = screen.getByText(/ascendente/i);
    const desc = screen.getByText(/Descendente/i);
    const orderBtn = screen.getByRole('button', {  name: /ordenar/i});
    const tatooine = await screen.findByRole('cell', {  name: /tatooine/i});
    const allPlanets = () => orderedPlanets = screen.getAllByTestId('planet-name');
    // const alderaan = await screen.findByRole('cell', {  name: /alderaan/i});
    // const yavinIV = await screen.findByRole('cell', {  name: /yavin iv/i});

    expect(tatooine).toBeInTheDocument();
    allPlanets();

    expect(orderedPlanets[0]).toHaveTextContent('Tatooine');
    expect(orderedPlanets[1]).toHaveTextContent('Alderaan');
    expect(orderedPlanets[9]).toHaveTextContent('Kamino');

    userEvent.click(asc);
    userEvent.click(orderBtn);
    allPlanets();
      
    expect(orderedPlanets[0]).toHaveTextContent('Yavin IV');
    expect(orderedPlanets[1]).toHaveTextContent('Tatooine');
    expect(orderedPlanets[9]).toHaveTextContent('Dagobah');

    userEvent.click(desc);
    userEvent.click(orderBtn);
    allPlanets();

    expect(orderedPlanets[0]).toHaveTextContent('Coruscant');
    expect(orderedPlanets[1]).toHaveTextContent('Naboo');
    expect(orderedPlanets[9]).toHaveTextContent('Dagobah');
  });
});


// rotation_period
// orbital_period
// diameter
// climate
// gravity
// terrain
// surface_water
// population