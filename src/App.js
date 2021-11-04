import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

function App () {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/home" element={ <Home /> } />
          <Route exact path="/" element={ <Home /> } />
          <Route path="*" element={ <ErrorPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;