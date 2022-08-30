import { Route, Routes, Navigate } from 'react-router-dom'
import { DashBoardPage } from '../pages/DashBoardPage'
import { SchedulePage } from '../pages/SchedulePage'
import { TurnPage } from '../pages/TurnPage'
import { WorkersPage } from '../pages/WorkersPage'

export const AppRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={ <DashBoardPage /> } />

    {/* -----Workers */}
    <Route path="/trabajadores" element={ <WorkersPage /> } /> 
    <Route path="/trabajadores/turnos" element={ <TurnPage /> } />
    <Route path="/trabajadores/horarios" element={ <SchedulePage /> } />

    <Route path="/*" element={ <Navigate to="/" /> } />
   </Routes>
  )
}
