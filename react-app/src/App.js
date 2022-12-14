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
import Treatments from './components/TreatmentInput';
import Welcome from './components/WelcomePage';
import UpdateTreatment from './components/updateTreatment';
import DeviceBluetooth from './components/DeviceControls';
import '../src/index.css'

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
              <div>
                <LoginForm />
              </div>
              <div>
                <SignUpForm />
              </div>
            </div>
          </Route>
          <ProtectedRoute path="/trial-design" exact={true}>
            <TrialDetails />
          </ProtectedRoute>
          <Route path="/treatments/control">
            <DeviceBluetooth />
          </Route>
          <ProtectedRoute path="/treatments/freq/:id">
            <UpdateTreatment />
          </ProtectedRoute>
          <ProtectedRoute path="/treatments/:trialId">
            <Treatments />
          </ProtectedRoute>
          <Route path="/summery">
            <SummeryPage />
          </Route>

          <Route path="/" exact={true}>
            <Welcome />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
