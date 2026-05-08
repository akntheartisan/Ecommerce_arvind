import { useState } from 'react'
import { Outlet, Routes,Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/home/Home'
import Register from './components/custom/Register'
import Login from './components/custom/login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route Path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
