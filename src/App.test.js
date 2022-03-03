import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import BookCard from "./components/BookCard";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
