// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function RedirectToUrl() {
//   const { shortUrl } = useParams();
//   const navigate = useNavigate(); // For programmatic navigation

//   useEffect(() => {
//     // Fetch URLs from localStorage
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (!loggedInUser) {
//       alert('Please log in to access your URLs.');
//       navigate('/login'); // Redirect to login if not logged in
//       return;
//     }

//     const userUrls = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
//     // Find the matching URL for the shortUrl
//     const matchedUrl = userUrls.find((url) => url.shortUrl.split('/')[1] === shortUrl);

//     if (matchedUrl) {
//       // Redirect to the actual URL
//       window.location.href = matchedUrl.url;
//     } else {
//       alert('Invalid or expired short URL.');
//       navigate('/list'); // Optionally redirect back to the URL list page if the short URL is invalid
//     }
//   }, [shortUrl, navigate]);

//   return (
//     <div>
//       <h2>Redirecting...</h2>
//     </div>
//   );
// }

// export default RedirectToUrl;


// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function RedirectToUrl() {
//   const { shortUrl } = useParams();

//   useEffect(() => {
//     // Fetch URLs from localStorage
//     const userUrls = JSON.parse(localStorage.getItem('userUrls')) || [];
//     // Find the matching URL for the shortUrl
//     const matchedUrl = userUrls.find((url) => url.shortUrl === `short.ly/${shortUrl}`);
//     if (matchedUrl) {
//       // Redirect to the actual URL
//       window.location.href = matchedUrl.url;
//     } else {
//       alert('Invalid or expired short URL.');
//     }
//   }, [shortUrl]);

//   return (
//     <div>
//       <h2>Redirecting...</h2>
//     </div>
//   );
// }

// export default RedirectToUrl;
