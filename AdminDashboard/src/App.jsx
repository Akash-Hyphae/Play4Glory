import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import Tournament from './Pages/Tournament'
import PrizeDistribution from './Pages/PrizeDistribution'
import IDPass from './Pages/IDPass'
import PointsTable from './Pages/PointsTable'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' exact={true} element={<Home/>} />
      <Route path='/admin-tournament' exact={true} element={<Tournament/>} />
      <Route path='/prize-distribution' exact={true} element={<PrizeDistribution/>} />
      <Route path='/id-pass' exact={true} element={<IDPass/>} />
      <Route path='/points-table' exact={true} element={<PointsTable/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
