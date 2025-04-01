
// // redux logoutimport React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';  // Import dispatch from react-redux
// import { removeItem } from '../store/authSlice';  // Import removeItem action

// function Logout() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();  // Initialize dispatch

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');  // Remove from localStorage
//     dispatch(removeItem());  // Clear Redux state
//     navigate('/login');
//   };

//   const handleCancel = () => {
//     navigate('/home');
//   };

//   return (
//     <>
//       <div className="container-fluid vh-100 d-flex flex-column">
//         <div className="flex-grow-1 d-flex justify-content-center align-items-center">
//           <div className="col-md-4 p-4 shadow rounded bg-light text-center">
//             <h2 className="mb-4">Are you sure you want to log out?</h2>
//             <div className="mb-3">
//               <button onClick={handleLogout} className="btn btn-danger w-100 mb-2">
//                 Confirm Logout
//               </button>
//               <button onClick={handleCancel} className="btn btn-secondary w-100">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Logout;



// normal old logout
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <>
    <div className="container-fluid vh-100 d-flex flex-column">
      {/* Main content area */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="col-md-4 p-4 shadow rounded bg-light text-center">
          <h2 className="mb-4">Are you sure you want to log out?</h2>
          <div className="mb-3">
            <button onClick={handleLogout} className="btn btn-danger w-100 mb-2">
              Confirm Logout
            </button>
            <button onClick={handleCancel} className="btn btn-secondary w-100">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
}

export default Logout;