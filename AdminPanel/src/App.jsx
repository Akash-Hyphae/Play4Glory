import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PrizeDistribution from "./Pages/PrizeDistribution";
import IDPass from "./Pages/IDPass";
import PointsTable from "./Pages/PointsTable";
import Host from "./Pages/Host";
import Create from "./Pages/Create";
import Leaderboard from "./Pages/Leaderboard";
import Login from "./Pages/Login/index";
import TDMBracket from "./Pages/TDMBracket/index";
import AdminTournamentDetail from "./Pages/TournamentDetail/index";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAdminRoute>
              <Home />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedAdminRoute>
              <Create />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/tournament-details/:tournamentId"
          element={
            <ProtectedAdminRoute>
              <AdminTournamentDetail />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/prize-distribution"
          element={
            <ProtectedAdminRoute>
              <PrizeDistribution />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/id-pass"
          element={
            <ProtectedAdminRoute>
              <IDPass />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/points-table/:tournamentId"
          element={
            <ProtectedAdminRoute>
              <PointsTable />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/host"
          element={
            <ProtectedAdminRoute>
              <Host />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedAdminRoute>
              <Leaderboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/tdm-bracket/:tournamentId"
          element={
            <ProtectedAdminRoute>
              <TDMBracket />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;