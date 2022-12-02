import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  let [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderErr,setRenderErr] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const valErr = {}
    if (email.length && !validateEmail(email)) valErr.email ='invalid email'
    else if (!email.length) valErr.emailErr = 'email is required'
    if (!password) valErr.passwordErr= 'password required'
    errors = valErr
  },[email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    renderErr(true)
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    } else {
      <Redirect to='/summery' />
    }
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/summery' />;
  }

  return (
    <form onSubmit={onLogin} className="login">
      <h2 className="login-title">Login</h2>
      <div>
        {Object.values(errors).map((error, ind) => (
          <div id="errors" key={ind}>
            {error}
          </div>
        ))}
      </div>
      <div>
        <div>
          {renderErr && errors.emailErr ? (
            <label className="text renderError" htmlFor="email">
              Email: {errors.emailErr}
            </label>
          ) : (
            <label className="text noRenderError" htmlFor="email">
              Email
            </label>
          )}
        </div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <div>
          {renderErr && errors.passwordErr ? (
            <label className="text renderError" htmlFor="email">
              Password: {errors.passwordErr}
            </label>
          ) : (
            <label className="text noRenderError" htmlFor="email">
              Password
            </label>
          )}
        </div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type="submit">
        Login
      </button>
      <button onClick={demoUser}>Demo User</button>
    </form>
  );
};

export default LoginForm;
