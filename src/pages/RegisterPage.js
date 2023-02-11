import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formState, setFormState] = useState(false);
  const [formUploaded, setFormUploaded] = useState(false);

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
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
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
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className='register'>
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
      {formUploaded && <button type='button'>Uploaded</button>}
      <button type='submit'>{formState ? 'Registering...' : 'Register'}</button>
    </form>
  );
};

export default RegisterPage;
