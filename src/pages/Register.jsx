import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeHandleInput = ({ target }) => {
    setUserData( prevState => {
      return { ...prevState, [target.name] : target.value }
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    // validacion 
    setError('')

    // si todo esta bien se procede hacer la peticion POST
    try {
      const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/users/register`, userData);
      const newUser = await response.data;
      console.log(  newUser );
      if(!newUser) {
        setError("Couldn't register user. Please try again.");
      }
      navigate('/login');
    } catch (err) {
      setError( err.response.data.message )
    }

  }

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={ registerUser }>
          
          { error && <p className="form__error-message">  { error } </p> }

          <input 
            type="text" 
            placeholder='Full name' 
            name='name' 
            value={ userData.name } 
            onChange={ changeHandleInput }
          />

          <input 
            type="text" 
            placeholder='Email' 
            name='email' 
            value={ userData.email } 
            onChange={ changeHandleInput }
          />

          <input 
            type="password" 
            placeholder='Password' 
            name='password' 
            value={ userData.password } 
            onChange={ changeHandleInput }
          />

          <input 
            type="password" 
            placeholder='Confirm Password' 
            name='password2' 
            value={ userData.password2 } 
            onChange={ changeHandleInput }
          />

          <button type="submit" className='btn primary'>Register</button>
        </form>
        <small>Already have an account <Link to='/login'> Sign In </Link> </small>
      </div>
    </section>
  )
}

export default Register