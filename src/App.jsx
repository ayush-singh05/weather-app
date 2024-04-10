import React from 'react'
import CityTable from './component/CityTable'
import Weather from './component/Weather'

import { BrowserRouter,Route,Routes } from "react-router-dom";


function App() {
  return (

    <BrowserRouter>
      <Routes> 
      <Route path='/' element={<CityTable/>} />
      <Route path='/weather' element={<Weather/>} />
      </Routes>
    </BrowserRouter>


  )
}

export default App