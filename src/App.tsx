import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NoLoginFrontPage from './pages/NoLoginFrontPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="*">
          <NoLoginFrontPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
