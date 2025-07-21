import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Results from './pages/Results/results';
import Quiz from './pages/Quiz/quiz';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Quiz />} />
				<Route path="/:questionIndex" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);
