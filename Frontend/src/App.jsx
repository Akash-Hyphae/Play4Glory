import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter,Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import TournamentPage from "./Pages/TournamentPage";
import TournamentDetailPage from "./Components/TournamentDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/tournament" exact={true} element={<TournamentPage/>} />
        <Route path="/tournament-details/:id" element={<TournamentDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
