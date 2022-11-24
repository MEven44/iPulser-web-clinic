import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SummeryPage from './components/summeryPage'
import { authenticate } from './store/session';

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
      <NavBar loaded={loaded}/>
      {loaded && (
      <Switch>
        <Route path="/login-signup" exact={true}>
          <LoginForm />
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/treatments" exact={true}>
         
        </ProtectedRoute>
       
        <Route path="/" exact={true}>
          <h1>My Home Page</h1>
         <SummeryPage />
        </Route>
      </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
