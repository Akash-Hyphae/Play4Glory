import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PrizeDistribution from "./Pages/PrizeDistribution";
import IDPass from "./Pages/IDPass";
import PointsTable from "./Pages/PointsTable";
import Host from "./Pages/Host";
import Create from "./Pages/Create";
import Leaderboard from "./Pages/Leaderboard";
import IdPass from "./Pages/IDPass";
import Login from "./Pages/Login/index";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/create" exact={true} element={<Create />} />
        <Route
          path="/prize-distribution"
          exact={true}
          element={<PrizeDistribution />}
        />
        <Route path="/id-pass" exact={true} element={<IdPass />} />
        <Route
  path="/points-table/:tournamentId"
  element={<PointsTable />}
/>
        <Route path="/host" exact={true} element={<Host />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
