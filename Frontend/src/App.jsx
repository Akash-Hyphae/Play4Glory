import React from "react";
import "./App.css";
import Header from "./Components/Header";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import TournamentPage from "./Pages/TournamentPage";
import TournamentDetailPage from "./Components/TournamentDetailPage";
import ScrimPage from "./Pages/ScrimPage";
import TdmKnockoutSection from "./Pages/TdmKnockoutSection";
import TdmDetailsPage from "./Pages/TdmDetailPage";
import LivePage from "./Pages/LivePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/Home/SignupPage";
import { useEffect } from "react";
import ProfilePage from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/tournament" exact={true} element={<TournamentPage />} />
        <Route
          path="/tournament-details/:id"
          element={<TournamentDetailPage />}
        />
        <Route path="/scrim" exact={true} element={<ScrimPage />} />
        <Route path="/tdm" exact={true} element={<TdmKnockoutSection />} />
        <Route path="/tdm-details/:id" element={<TdmDetailsPage />} />
        <Route path="/live" exact={true} element={<LivePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
