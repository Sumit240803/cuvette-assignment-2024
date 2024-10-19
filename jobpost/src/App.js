// App.js
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SignUpForm from './components/SignUpForm';
import VerificationForm from './components/VerificationForm';
import HomePage from './components/HomePage'; // Create this component for redirection

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="main-section">
          <div className="form">
            <Routes>
          
              <Route
                path="/"
                element={!isSignedUp ? <SignUpForm onSuccess={() => setIsSignedUp(true)} /> : <VerificationForm />}
              />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </div>
        </div>
          
      </div>
    </Router>
  );
}

export default App;
