import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NoLoginFrontPage from './pages/NoLoginFrontPage';
import RegisterPage from './pages/RegisterPage';
import FrontPage from './pages/FrontPage';
import Navbar from './components/Navbar';
import { checkLogin } from './api';
import { User } from './api/types';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
        const user = await checkLogin();
        if (user) {
          setUser(user);
        }
    }
    if (isFirstRender) {
      setIsFirstRender(false);
      checkAuthentication();
    }
  }, [isFirstRender]);

  return (
    <Router>
      {!user ? (
        <Switch>
          <Route path="/login">
            <LoginPage setUser={setUser} />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="*">
            <NoLoginFrontPage />
          </Route>
        </Switch>
      ) : (
        <>
          <Route path="*">
            <Navbar currentUser={user} setUser={setUser} />
          </Route>
          <Switch>
            <Route path="*">
              <FrontPage currentUser={user}/>
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

export default App;
