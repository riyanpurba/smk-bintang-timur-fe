import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import SchoolSchema from './Components/Common/SchoolSchema';

import Home from './Pages/Home'

const App = () => {

  return (
    <>
      <SchoolSchema />
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
