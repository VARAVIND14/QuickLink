




// with modal
// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Navbar() {
//   const [username, setUsername] = useState(null);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility

//   useEffect(() => {
//     // Check for logged-in user in localStorage
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       setUsername(loggedInUser.username); // Set the username
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     setShowModal(false); // Close the modal
//     window.location.href = '/login'; // Redirect to login page
//   };

//   const handleCancel = () => {
//     setShowModal(false); // Close the modal if canceled
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
//         <div className="navbar-brand">
//           <h4>Url Shortner</h4>
//         </div>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
//           <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
//             <li className="nav-item">
//               <NavLink to={"/login"} className={'nav-link ' + (status => status.isActive ? 'active' : '')}>
//                 Login
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to={"/home"} className={'nav-link ' + (status => status.isActive ? 'active' : '')}>
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to={"/aboutus"} className={'nav-link ' + (status => status.isActive ? 'active' : '')}>
//                 About Us
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to={"/list"} className={'nav-link ' + (status => status.isActive ? 'active' : '')}>
//                 Listing
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <button
//                 className="nav-link btn btn-link"
//                 onClick={() => setShowModal(true)} // Show modal on click
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//           <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'lightblue' }}>
//             @{username}
//           </span>
//         </div>
//       </nav>

//       {/* Modal for Logout Confirmation */}
//       {showModal && (
//         <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Logout</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                   onClick={handleCancel}
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to log out?</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-danger" onClick={handleLogout}>
//                   Confirm Logout
//                 </button>
//                 <button type="button" className="btn btn-secondary" onClick={handleCancel}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;




// with updated navbar ,old one,logincheck
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";  // Import useSelector from react-redux

function Navbar() {
    // const loggedInUser = useSelector((state) => state.auth.loggedInUser);  // Get logged-in user from Redux
          const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>QUICK LINK</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    
                        <>
                            <li className="nav-item">
                                <NavLink to="/home" className="nav-link">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/aboutus" className="nav-link">
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/add" className="nav-link">
                                    Addurl
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/list" className="nav-link">
                                    Listing
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/logout" className="nav-link">
                                    Logout
                                </NavLink>
                            </li>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'lightblue' }}>
                                WELCOME  {loggedInUser.username}
                            </span>
                        </>
                    
                        {/* <>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">
                                    Signup
                                </NavLink>
                            </li>
                        </> */}
                    
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;




// old one 
// import { NavLink } from "react-router-dom";
// import { useState,useEffect } from "react";

// function Navbar() {
//     const [username, setUsername] = useState(null);

//     useEffect(() => {
//       // Check for logged-in user in localStorage
//       const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//       if (loggedInUser) {
//         setUsername(loggedInUser.username); // Set the username
//       }
//     }, []);
//     return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
//         <div className="navbar-brand">
//             <h4>Url Shortner</h4>
//         </div>
//         <button className="navbar-toggler" type="button" data-toggle="collapse"
//             data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
//             aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//         </button>
//         <div
//         className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{ float: "left" }}>
//             <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
//             <li className="nav-item">
//                 <NavLink to={"/login"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                     Login
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink to={"/home"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                     Home
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                <NavLink to={"/aboutus"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}> Aboutus
//                </NavLink>
                              
//                </li>
//                {/* <li className="nav-item">
//                <NavLink to={"/add"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                AddUrl</NavLink>
//                </li> */}
//                <li className="nav-item">
//                <NavLink to={"/list"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                Listing</NavLink>
//                </li>
//                {/* <li className="nav-item">
//                 <NavLink to={"/signup"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                     Signup
//                 </NavLink>
//                 </li> */}

//                <li className="nav-item">
//                 <NavLink to={"/logout"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
//                     Logout
//                 </NavLink>
//                 </li>   
//             </ul>
//             <span  style={{ fontSize: '1.2rem', fontWeight: 'bold',color: 'lightblue' }}>
//    @{username}
// </span>
//         </div>
//     </nav>;
// }

// export default Navbar