import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from './context/UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  React.useEffect(() => {
    const d = async () => {
      const res = await fetch('http://localhost:4000/profile', {
        credentials: 'include',
      });

      const data = await res.json();

      setUserInfo(data.username);
    };

    d();
  }, []);

  console.log('userInfo', userInfo);

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });

    setUserInfo(null);
  };

  return (
    <header className='App-header'>
      <Link className='logo' to='/'>
        {' '}
        MyBlog{' '}
      </Link>

      <nav>
        {userInfo && (
          <>
            <Link to='/create'>Create new article</Link>
            <span onClick={logout}>Logout</span>
          </>
        )}

        {userInfo === null && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
