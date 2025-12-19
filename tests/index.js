import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App'; // Adjust the path as necessary
import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI
const client = new MongoClient(uri);

beforeAll(async () => {
    await client.connect();
});

afterAll(async () => {
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

    test('submits the form and updates the database', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/type here/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(inputElement, { target: { value: 'test submit' } });
        fireEvent.click(submitButton);

        const response = await client.db('testdb').collection('testcollection').findOne({ input: 'test submit' });
        expect(response).not.toBeNull();
    });

    test('displays error message on failed submission', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/type here/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(inputElement, { target: { value: '' } }); // Simulate empty input
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/input cannot be empty/i);
        expect(errorMessage).toBeInTheDocument();
    });
});