/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  jest.useFakeTimers();
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
  // Exhaust all pending initialization animations and timers without getting stuck on infinite loops
  await ReactTestRenderer.act(() => {
    jest.advanceTimersByTime(5000);
  });
});
