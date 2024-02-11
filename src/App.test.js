import { render, screen } from '@testing-library/react';
import App from './App';

test('renders For You link', () => {
    render(<App />);
    const linkElement = screen.getByText(/For You/i);
    expect(linkElement).toBeInTheDocument();
});
