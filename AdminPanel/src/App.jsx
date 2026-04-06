import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import PrizeDistribution from './Pages/PrizeDistribution'
import IDPass from './Pages/IDPass'
import PointsTable from './Pages/PointsTable'
import Host from './Pages/Host'
import Create from './Pages/Create'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' exact={true} element={<Home/>} />
      <Route path='/create' exact={true} element={<Create/>} />
      <Route path='/prize-distribution' exact={true} element={<PrizeDistribution/>} />
      <Route path='/id-pass' exact={true} element={<IDPass/>} />
      <Route path='/points-table' exact={true} element={<PointsTable/>} />
      <Route path='/host' exact={true} element={<Host/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
