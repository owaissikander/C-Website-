import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './pages/signin'
import Home from './pages/Home'
import Signup from './pages/signup'
import Header from './component/Header'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetails'
function App() {

  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />


        
      </Routes>
    </BrowserRouter>



  )
}

export default App
