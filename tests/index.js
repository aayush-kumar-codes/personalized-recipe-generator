import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App'; // Adjust the path as necessary
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/test'; // Update with your MongoDB URI
let client;

beforeAll(async () => {
  client = new MongoClient(uri);
  await client.connect();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  await client.close();
});

describe('App Component', () => {
  test('renders the app correctly', () => {
    render(<App />);
    const linkElement = screen.getByText(/welcome to the app/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('handles user input correctly', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/type here/i);
    fireEvent.change(inputElement, { target: { value: 'test input' } });
    expect(inputElement.value).toBe('test input');
  });

  test('submits the form correctly', async () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/type here/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: 'test input' } });
    fireEvent.click(submitButton);

    const successMessage = await screen.findByText(/submission successful/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('API is down'))
    );

    render(<App />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/submission failed/i);
    expect(errorMessage).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});