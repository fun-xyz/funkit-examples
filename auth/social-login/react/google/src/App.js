import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/home';
import Callback from './components/callback';

function App() {
  return (
    <div>
      <Router>
        <BrowserRouter>
          <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/callback' element={<Callback />} />
          </Switch>
        </BrowserRouter>
      </Router>
    </div>
  );
}

export default App;