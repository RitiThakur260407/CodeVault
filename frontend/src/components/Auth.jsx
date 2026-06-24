import { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/users/login' : '/api/users';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`https://codevault-cs1i.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="input-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p className="toggle-text">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link" style={{color: '#007bff', cursor: 'pointer', fontWeight: 'bold'}}>
          {isLogin ? 'Sign up here' : 'Login here'}
        </span>
      </p>
    </div>
  );
};

export default Auth;