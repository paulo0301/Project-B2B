import { useState } from 'react'
import { AuthProvider } from './context/AuthProvider'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ProtectedLayout } from './components/protectedLayout/index'
import { Login } from './components/Login'
import { Profile } from './components/Profile'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path='/profile' element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          }>
          </Route>
        </Routes>

        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App