import React, { useState } from 'react';
import Navbar from '../Navbar';
// import checkAuth from './checkAuth';

function AddUrl() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddUrl = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
      setError('Please log in to add URLs.');
      return;
    }

    if (!title || !url) {
      setError('Both title and URL are required.');
      return;
    }

    // Retrieve the user's URLs from localStorage
    const userUrls = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];

    // Check if the user has already added 5 URLs
    if (userUrls.length >= 5) {
      setError('You can only add up to 5 URLs.');
      return;
    }

    const newUrl = {
      title,
      url,
      shortUrl: `short.ly/${Math.random().toString(36).substring(2, 8)}`,
      addedAt: new Date().toISOString()
    };

    // Add the new URL to the user's list
    userUrls.push(newUrl);
    localStorage.setItem(loggedInUser.username, JSON.stringify(userUrls)); // Save under logged-in user's unique ID

    setTitle('');
    setUrl('');
    setError('');
  };

  return (
    <>
      <Navbar/>
      <div className="container">
        <h2 className="text-center">Add URL</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddUrl}>
          Add URL
        </button>
      </div>
    </>
  );
}

export default AddUrl;
    
    
    // import React, { useState } from 'react';
    // import { Alert, Button } from 'react-bootstrap'; // You can keep Alert and Button from Bootstrap for styling
    // import Navbar from '../Navbar';
    // // import { useNavigate } from 'react-router-dom';

    // function AddUrl() {
    // const [title, setTitle] = useState('');
    // const [url, setUrl] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    // //   const navigate = useNavigate();

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handleUrlChange = (e) => {
    //     setUrl(e.target.value);
    // };

    // const handleAddUrl = (e) => {
    //     e.preventDefault();

    //     // Check if both title and url are provided
    //     if (!title || !url) {
    //     setError('Please enter both a title and a URL.');
    //     return;
    //     }

    //     // Validate URL format
    //     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    //     if (!regex.test(url)) {
    //     setError('Please enter a valid URL.');
    //     return;
    //     }

    //     // Check if user is logged in
    //     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    //     if (!loggedInUser) {
    //     setError('Please log in to add a URL.');
    //     return;
    //     }

    //     // Get user URLs from localStorage
    //     const userUrls = JSON.parse(localStorage.getItem('userUrls')) || [];

    //     // Check if the user has already added 5 URLs
    //     if (userUrls.length >= 5) {
    //     setError('You can only add up to 5 URLs.');
    //     return;
    //     }

    //     // Generate short URL (for simplicity, we will just use a random number here)
    //     const shortUrl = `short.ly/${Math.random().toString(36).substring(2, 8)}`;

    //     // Create a new URL object and add to the user's URLs
    //     const newUrl = { title, url, shortUrl, addedAt: new Date().toISOString() };
    //     userUrls.push(newUrl);

    //     // Store the updated URLs in localStorage
    //     localStorage.setItem('userUrls', JSON.stringify(userUrls));

    //     setSuccess('URL added and shortened successfully!');
    //     setError('');
    //     setTitle('');
    //     setUrl('');
    // };

    // return (
    //     <>
    //     <Navbar/>
    //     <div className="container">
    //     <h2 className="text-center">Add URL</h2>
    //     <form onSubmit={handleAddUrl}>
    //         <div className="form-group">
    //         <label htmlFor="title">Title</label>
    //         <input
    //             type="text"
    //             id="title"
    //             placeholder="Enter title"
    //             value={title}
    //             onChange={handleTitleChange}
    //             className="form-control"
    //         />
    //         </div>

    //         <div className="form-group">
    //         <label htmlFor="url">URL</label>
    //         <input
    //             type="text"
    //             id="url"
    //             placeholder="Enter URL"
    //             value={url}
    //             onChange={handleUrlChange}
    //             className="form-control"
    //         />
    //         </div>

    //         {error && <Alert variant="danger">{error}</Alert>}
    //         {success && <Alert variant="success">{success}</Alert>}

    //         <Button variant="primary" type="submit" className="w-100 mt-3">
    //         Add URL
    //         </Button>
    //     </form>
    //     </div>
    //     </>
    // );
    // }

    // export default AddUrl;



    