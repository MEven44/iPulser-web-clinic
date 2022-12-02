import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../../index.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [title, setTitle]=useState('')
  const [speciality,setSpeciality]=useState('')
  const [renderErr,setRenderErr]=useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setRenderErr(true)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, title, speciality, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(()=>{
    let errVal = {}
    if (!username) errVal.usernameErr = 'You must have a user name'
    
    if (!email) errVal.emailErr = 'You must enter an email'

    if (password && password !== repeatPassword) errVal.passwordErr = 'your password not match'
    else if (!password) errVal.passwordErr = ' you must enter a password'

    setErrors(errVal)
  },[username, email, password, repeatPassword])
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/summery' />;
  }
console.log('ERRORS SIGNUP', errors)
  return (
    <form onSubmit={onSignUp} className="login">
      <h2 className="login-title">signup</h2>
      <div id="errors">
        {Object.values(errors).map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        {renderErr && errors.usernameErr ? (
          <label id="errors" htmlFor="email">
            Name: {errors.usernameErr}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="email">
            Name
          </label>
        )}
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <label>Title</label>
        <select
          name="Title"
          id="select"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        >
          <option value="">Select title</option>
          <option value="Autodeduct">Autodeduct</option>
          <option value="phd">Ph.d</option>
          <option value="M.D">M.D</option>
          <option value="nurse">Nurse</option>
          <option value="studeny">Student</option>
        </select>
      </div>
      <div>
        <label>Speciality</label>
        <input
          type="text"
          name="speciality"
          onChange={(e) => setSpeciality(e.target.value)}
          value={speciality}
          required={true}
        ></input>
      </div>
      <div>
        {renderErr && errors.emailErr ? (
          <label id="errors" htmlFor="email">
            Email: {errors.emailErr}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="email">
            Email
          </label>
        )}
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        {renderErr && errors.passwordErr ? (
          <label id="errors" htmlFor="email">
            Password: {errors.passwordErr}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="email">
            Password
          </label>
        )}
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
