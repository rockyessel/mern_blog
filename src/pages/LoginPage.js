import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formState, setFormState] = useState(false);
  const [formUploaded, setFormUploaded] = useState(false);
  const { setUserInfo } = useContext(userContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const formUpdates = {
      ...formData,
      [event.target.name]: event.target.value,
    };

    setFormData(formUpdates);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.username === '' || formData.password === '') {
      setFormState(false);
      return;
    }

    console.log('form', formData);

    try {
      setFormState(true);
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      setUserInfo(data);
      setFormState(false);

      if (data.status === 201) {
        setFormUploaded(true);
        setTimeout(() => setFormUploaded(false), 1000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setFormData({ username: '', password: '' });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className='login'>
      <input
        value={formData.username}
        placeholder='username'
        onChange={handleChange}
        name='username'
        type='text'
      />

      <input
        value={formData.password}
        placeholder='password'
        onChange={handleChange}
        name='password'
        type='password'
      />
      {formUploaded && <button type='button'>Signed in</button>}
      <button type='submit'>{formState ? 'Logging in...' : 'Login'}</button>
    </form>
  );
};

export default LoginPage;
