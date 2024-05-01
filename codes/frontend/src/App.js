// App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import EnterPro from './components/EnterPro';
import Footer from './components/Footer';
import SearchPage from "./components/SearchPage"
import ProductDetail from './components/ProductDetail';
const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar /> {/* Include Navbar outside the Routes */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" exact element={<SearchPage />} />
          <Route path="/enter" exact element={<EnterPro />} />
          <Route path="/details/:id" exact element={<ProductDetail />} />
          {/* Add more routes here */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
