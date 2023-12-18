import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { ShopPage, AuthPage, CheckoutPage, PurchasedItemsPage } from './pages';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<ShopPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/purchased-items' element={<PurchasedItemsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;