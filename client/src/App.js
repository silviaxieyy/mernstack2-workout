import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Home  from './pages/Home'
import  Navbar from './components/Navbar';
import Signup1 from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup1' element={<Signup1 />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
