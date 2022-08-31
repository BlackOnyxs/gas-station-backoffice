import { Route, Routes, Navigate } from 'react-router-dom'
import { BuyInvoicePage } from '../pages/BuyInvoicePage'
import { DashBoardPage } from '../pages/DashBoardPage'
import { FuelPage } from '../pages/FuelPage'
import { OilPage } from '../pages/OilPage'
import { ProviderPage } from '../pages/ProviderPage'
import { SchedulePage } from '../pages/SchedulePage'
import { SellInvoicePage } from '../pages/SellInvoicePage'
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

    {/* Inventory */}
    <Route path="/inventario/combustibles" element={ <FuelPage /> } /> 
    <Route path="/inventario/aceites" element={ <OilPage /> } /> 

    {/* Provider */}
    <Route path="/proveedores" element={ <ProviderPage /> } /> 

    {/* Invoices */}
    <Route path="/compras" element={ <BuyInvoicePage /> } /> 
    <Route path="/ventas" element={ <SellInvoicePage /> } /> 


    <Route path="/*" element={ <Navigate to="/" /> } />
   </Routes>
  )
}
