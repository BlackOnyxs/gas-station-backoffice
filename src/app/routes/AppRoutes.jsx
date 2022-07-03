import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../../auth/pages/LoginPage'
import { DashBoardPage } from '../pages/DashBoardPage'
import { PeoplePage } from '../pages/PeoplePage'

export const AppRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={ <DashBoardPage /> } />
    <Route path="/people" element={ <PeoplePage /> } /> 
    <Route path="/location" element={ <LoginPage /> } />

    <Route path="/*" element={ <Navigate to="/" /> } />
   </Routes>
  )
}
