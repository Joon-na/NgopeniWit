import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import BudidayaTracker from './pages/BudidayaTracker';
import Statistics from './pages/Statistics';
import InfoBudidaya from './pages/InfoBudidaya';
import About from './pages/About';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    // Memuat user dari localStorage saat aplikasi dimuat
    const storedUser  = localStorage.getItem('user');
    if (storedUser ) {
      setUser (JSON.parse(storedUser ));
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login setUser ={setUser } />} />
          <Route 
            path="budidaya-tracker" 
            element={<PrivateRoute element={<BudidayaTracker user={user} />} user={user} />} 
          />
          <Route path="info-budidaya" element={<InfoBudidaya />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;