import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import TrialDetails from './components/TrialDesign';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SummeryPage from './components/summeryPage'
import { authenticate } from './store/session';
import Treatments from './components/treatments';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(authenticate()).then(()=>setLoaded(true))
    
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      {loaded && (
        <Switch>
          <Route path="/login-signup" exact={true}>
            <div className="login-container">
              <div className="login">
                <LoginForm />
              </div>
              <div className="signup">
                <SignUpForm />
              </div>
            </div>
          </Route>
          <ProtectedRoute path="/trial-design" exact={true}>
            <TrialDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/treatments/:trialId'>
            <Treatments />
          </ProtectedRoute>
         

          <Route path="/" exact={true}>
            <SummeryPage />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
