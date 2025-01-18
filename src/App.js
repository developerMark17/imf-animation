import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ComingSoon } from './components/comingSoon/coming-soon';
import { Home } from './components/Home/Home';
import { Navbar } from './components/navbar/navbar';

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <HelmetProvider> {/* Wrap the app with HelmetProvider */}
        <BrowserRouter>
          <Navbar /> {/* Navbar stays outside Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
