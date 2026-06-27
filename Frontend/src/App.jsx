import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import TournamentPage from "./Pages/TournamentPage";
import TournamentDetailPage from "./Components/TournamentDetailPage";
import ScrimPage from "./Pages/ScrimPage";
import TdmKnockoutSection from "./Pages/TdmKnockoutSection";
import TdmDetailsPage from "./Pages/TdmDetailPage";
import LivePage from "./Pages/LivePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/Home/SignupPage";
import ProfilePage from "./Pages/Profile";
import WalletHistory from "./Pages/WalletHistory";
import Withdraw from "./Pages/Withdraw";
import AddMoney from "./Pages/AddMoney";
import ProtectedRoute from "./Components/ProtectRoute/index";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route
          path="/tournament-details/:id"
          element={<TournamentDetailPage />}
        />
        <Route path="/scrim" element={<ScrimPage />} />
        <Route path="/tdm" element={<TdmKnockoutSection />} />
        <Route path="/tdm-details/:id" element={<TdmDetailsPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-money"
          element={
            <ProtectedRoute>
              <AddMoney />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Withdraw />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet-history"
          element={
            <ProtectedRoute>
              <WalletHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;