import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";  // Import Router and Route components
import InputForm from "./components/InputForm";
import Summary from "./components/Summary";
import './styles/App.css';  // Importing global styles

const App = () => {
  return (
    <Router> {/* Wrap everything with BrowserRouter */}
      <div className="container">
        <h1>Investment Management</h1>
        
        {/* Navigation links to switch between components */}
        <nav>
          <ul>
            <li><Link to="/">Add Transaction</Link></li> {/* Link to InputForm */}
            <li><Link to="/summary">Transaction Summary</Link></li> {/* Link to Summary */}
          </ul>
        </nav>

        {/* Define Routes to switch between InputForm and Summary */}
        <Routes>
          <Route path="/" element={<InputForm />} /> {/* Default route (home) for InputForm */}
          <Route path="/summary" element={<Summary />} /> {/* Route for Summary */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
