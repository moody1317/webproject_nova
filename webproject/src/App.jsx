import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Firstaid from './pages/firstaid';
import Shelter from './pages/shelter';
import Hospital from './pages/hospital';
import Medicine from './pages/medicine';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    }
  }, []);

  return (
    <Router>
      <Navbar isOffline={ isOffline } />
      <Routes>
        <Route path="/" element={isOffline ? <Firstaid /> :<Home />} />
        <Route path="/firstaid" element={<Firstaid />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/medicine" element={<Medicine />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
