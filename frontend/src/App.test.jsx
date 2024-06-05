// __tests__/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../login/Login';

test('renders app page when navigating to /app', () => {
  window.history.pushState({}, 'App Page', '/app');

  render(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );

  const appElement = screen.getByText(/app/i);
  expect(appElement).toBeInTheDocument();
});
