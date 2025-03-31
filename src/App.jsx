import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Inputs from './pages/Inputs/Inputs';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/input' element={<Inputs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
