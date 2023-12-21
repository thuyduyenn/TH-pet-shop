import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import DashboardPage from "./pages/DashboardPage"
import NotFound from "./pages/NotFound"
import './App.css'
function App() {
  return (
    <>
       <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/shop" element={<ShopPage/>}></Route>
            <Route path="/dashboard" element={<DashboardPage/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
       </Routes>
    </>
  )
}

export default App
