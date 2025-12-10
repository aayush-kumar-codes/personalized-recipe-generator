import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App'; // Adjust the path as necessary
import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI
const client = new MongoClient(uri);

describe('App Component', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  test('renders the app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/My Web App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('handles button click', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(buttonElement);
    const responseElement = screen.getByText(/Submission successful/i);
    expect(responseElement).toBeInTheDocument();
  });

  test('fetches data from MongoDB', async () => {
    const response = await client.db('testdb').collection('testcollection').find({}).toArray();
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
  });

  test('handles API error gracefully', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('API Error')));
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(buttonElement);
    const errorElement = await screen.findByText(/Error fetching data/i);
    expect(errorElement).toBeInTheDocument();
    mockFetch.mockRestore();
  });
});