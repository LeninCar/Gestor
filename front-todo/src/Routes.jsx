import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './login/Login';


function Routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default Routes;
