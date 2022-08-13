// Write your tests here
import AppFunctional from './AppFunctional';
import AppClass from './AppClass'
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('AppFunctional renders without errors', () => {
  render(<AppFunctional/>); 
});

test('AppClass renders without errors', () => {
  render(<AppClass/>); 
});

test('renders the App Class header', () => {
  render(<AppClass/>);
  
  const headerElement = screen.queryByText(/coordinates/i)

  expect(headerElement).toBeInTheDocument();
});

test('AppClass has a submit button', () => {
  render(<AppClass/>);
  
  const submitButton = screen.findByTestId('submit')

  expect(submitButton).toBeInTheDocument
})

test('AppFunctional has a submit button', () => {
  render(<AppFunctional/>);
  
  const submitButton = screen.findByTestId('submit')

  expect(submitButton).toBeInTheDocument
})