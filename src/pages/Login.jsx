import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/useContext';


const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeHandleInput = ({ target }) => {
    setUserData( prevState => {
      return { ...prevState, [target.name] : target.value }
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
      const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/')

    } catch (error) {
      setError( error.response.data.message );
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className='form login__form' onSubmit={ loginUser } >
          { error && <p className="form__error-message"> { error } </p> }

          <input 
            type="text" 
            placeholder='Email' 
            name='email' 
            value={ userData.email } 
            onChange={ changeHandleInput }
            autoFocus
          />

          <input 
            type="password" 
            placeholder='Password' 
            name='password' 
            value={ userData.password } 
            onChange={ changeHandleInput }
          />

          <button type="submit" className='btn primary'>Login</button>
        </form>
        <small>Don't have an account <Link to='/register'> Sign Up </Link> </small>
      </div>
    </section>
  )
}

export default Login;