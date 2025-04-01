
// redux login 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';  // Import dispatch from react-redux
// import { setItem } from '../store/authSlice'; // Import setItem action
// import Navbar from '../Navbar';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Initialize dispatch

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
      setError('');
      localStorage.setItem('loggedInUser', JSON.stringify(user));  // Store in localStorage
      // dispatch(setItem(user));  // Update the Redux state
      alert('Logged in successfully!');
      navigate('/home');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6 p-4 shadow rounded bg-light">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;




// normal old login
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../Navbar';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Retrieve users from localStorage
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

//     const user = storedUsers.find(user => user.username === username && user.password === password);

//     if (user) {
//       setError('');
//       localStorage.setItem('loggedInUser', JSON.stringify(user));
//       alert('Logged in successfully!');
//       navigate('/home');
//     } else {
//       setError('Invalid username or password.');
//     }
//   };

//   return (
//     <>
//       <Navbar/>
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//     <div className="col-md-6 p-4 shadow rounded bg-light">
  
//       <h2 className="text-center mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label className="form-label">Username</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
  
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
  
//         {error && <div className="alert alert-danger">{error}</div>}
  
//         <button type="submit" className="btn btn-primary w-100">Login</button>
//       </form>
  
//       <div className="text-center mt-3">
//         <p>
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </p>
//       </div>
//     </div>
//   </div>
//   </>
  
//   );
// }

// export default Login;
