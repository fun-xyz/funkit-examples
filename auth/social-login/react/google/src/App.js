import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';
import Callback from './components/callback';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
