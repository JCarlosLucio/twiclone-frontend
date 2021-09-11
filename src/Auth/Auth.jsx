import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = () => {
  const [mode, setMode] = useState('login');

  return (
    <div>
      {mode === 'login' && (
        <div>
          <Login />
          <p>
            Don’t have an account?
            <button onClick={() => setMode('register')}>Register</button>
          </p>
        </div>
      )}
      {mode === 'register' && (
        <div>
          <Register />
          <p>
            Already have an account?
            <button onClick={() => setMode('login')}>Log in</button>
          </p>
        </div>
      )}
    </div>
  );
};
