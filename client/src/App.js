import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NumberSection from "./components/NumberSection";
import PokemonSection from "./components/PokemonSection";
import Register from "./components/Register";

function App() {
  
  return (
    <div className="App">
        <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/pokemon" element={<PokemonSection/>} />
          <Route path="/numbers" element={<NumberSection/>} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>          
        </Layout>
    </div>
  );
}

export default App;