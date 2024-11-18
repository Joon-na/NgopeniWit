import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import BudidayaTracker from './pages/BudidayaTracker'
import Statistics from './pages/Statistics'
import InfoBudidaya from './pages/InfoBudidaya';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="budidaya-tracker" element={<BudidayaTracker />} />
          <Route path="info-budidaya" element={<InfoBudidaya />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;