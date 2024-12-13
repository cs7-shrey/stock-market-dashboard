import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'

import Login from './routes/Login'
import Signup from './routes/Signup'
import Home from './routes/Home'
import Stocks from './routes/Stocks'
import { UserAuthContextProvider } from './context/UserAuthContext'
import { loader as stockLoader } from './routes/StockPage'
import { loader as stockRootLoader } from './routes/Stocks'
import ProtectedRoute from './routes/ProtectedRoute'
import StockPage from './routes/StockPage'
import LandingPage from './routes/LandingPage'

import Prices from './routes/stockinfo/Prices'
import IncomeStatements from './routes/stockinfo/IncomeStatements'
import BalanceSheet from './routes/stockinfo/BalanceSheet'
import Ratios from './routes/stockinfo/Ratios'
import RealTime from './routes/RealTime'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<UserAuthContextProvider><Outlet /></UserAuthContextProvider>}>
      <Route path='/'
        element={<LandingPage />}
      />
      <Route path='/login'
        element={<Login />}
      />
      <Route path='/signup'
        element={<Signup />}
      />
      {/* protected routes */}
      <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
        <Route path='/realtime'
          element={<RealTime />}
        />
        {/* <Route path='/home'
          element={<Home />}
        /> */}
        <Route path='/stocks'
          element={<Stocks />}
          loader={stockRootLoader}
        >
          <Route path='/stocks/:stockId' 
            element={<StockPage />}
            loader={stockLoader}
          >
            <Route path='/stocks/:stockId/prices' 
              element={<Prices />} 
              loader={stockLoader}
              />
              <Route path='/stocks/:stockId/income-statements'
                element={<IncomeStatements />}
                loader={stockLoader}
              />
              <Route path='/stocks/:stockId/balance-sheet'
                element={<BalanceSheet />}
                loader={stockLoader}
              />
              <Route path='/stocks/:stockId/ratios'
                element={<Ratios />}
                loader={stockLoader}
              />
          </Route>
        </Route>
      </Route>
    </Route>
  )
)

export { router };

// function App() {

//   return (
//     <>
//     </>
//   )
// }
