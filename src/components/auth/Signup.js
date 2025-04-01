import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
// import Navbar from '../Navbar';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = storedUsers.some(user => user.username === username);
    if (userExists) {
      setError('Username already exists.');
      return;
    }

    const newUser = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    setSuccess('User registered successfully!');
    navigate('/login');
    setError('');

    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="col-md-6 p-4 shadow rounded bg-light">
    <h2 className="text-center mb-4">Sign Up</h2>
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button type="submit" className="btn btn-primary w-100">Sign Up</button>
    </form>

    <div className="text-center mt-3">
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  </div>
</div>
</>

  );
}

export default Signup;
