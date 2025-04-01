import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
// import checkAuth from './checkAuth';
import { Modal, Button } from "react-bootstrap"; // Install react-bootstrap if not already installed

function ListUrl() {
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUrlId, setEditingUrlId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [deleteId, setDeleteId] = useState(null); // ID of the URL to delete

  const ITEMS_PER_PAGE = 3; // Display three URL per page

  // Fetch URLs from localStorage on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const userUrls =
        JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
      setUrls(userUrls);
      setFilteredUrls(userUrls);
    } else {
      setError("Please log in to view your URLs.");
    }
  }, []);

  // Pagination calculations
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUrls = filteredUrls.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUrls.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Edit functionality
  const handleEdit = (id, currentTitle, currentUrl) => {
    setEditingUrlId(id);
    setEditedTitle(currentTitle);
    setEditedUrl(currentUrl);
  };

  const handleSaveEdit = (id) => {
    const updatedUrls = urls.map((url) =>
      url.shortUrl === id ? { ...url, title: editedTitle, url: editedUrl } : url
    );
    setUrls(updatedUrls);
    setFilteredUrls(updatedUrls);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      localStorage.setItem(loggedInUser.username, JSON.stringify(updatedUrls));
    }
    setEditingUrlId(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  const handleCancelEdit = () => {
    setEditingUrlId(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  // Delete functionality
  const handleDelete = () => {
    const updatedUrls = urls.filter((url) => url.shortUrl !== deleteId);
    setUrls(updatedUrls);
    setFilteredUrls(updatedUrls);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      localStorage.setItem(loggedInUser.username, JSON.stringify(updatedUrls));
    }

    // Adjust pagination after deleting the last URL on the current page
    if (currentPage > 1 && updatedUrls.length / ITEMS_PER_PAGE < currentPage) {
      setCurrentPage(currentPage - 1);
    }
    setShowModal(false);
  };

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const searchResults = urls.filter(
      (url) =>
        url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUrls(searchResults);
    setCurrentPage(1); // Reset to the first page of results
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredUrls(urls);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="text-center">List of URLs</h2>
        {error && <p className="text-danger">{error}</p>}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, URL, or short URL"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleResetSearch}
            >
              Reset
            </button>
          </div>
        </form>

        {currentUrls.length === 0 ? (
          <p className="text-center">No URLs found.</p>
        ) : (
          <>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                  <th>Short URL</th>
                  <th>Added at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUrls.map((url) => (
                  <tr key={url.shortUrl}>
                    <td>
                      {editingUrlId === url.shortUrl ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="form-control"
                        />
                      ) : (
                        url.title
                      )}
                    </td>
                    <td>
                      {editingUrlId === url.shortUrl ? (
                        <input
                          type="text"
                          value={editedUrl}
                          onChange={(e) => setEditedUrl(e.target.value)}
                          className="form-control"
                        />
                      ) : (
                        <a
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.url}
                        </a>
                      )}
                    </td>
                    <td>
                      <a
                        href={url.url} // Directly use the actual URL for redirection
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortUrl}
                      </a>

                      {/* <a
                        href={`/short/${url.shortUrl.split('/')[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortUrl}
                      </a> */}
                    </td>
                    <td>{new Date(url.addedAt).toLocaleString()}</td>
                    <td>
                      {editingUrlId === url.shortUrl ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleSaveEdit(url.shortUrl)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() =>
                              handleEdit(url.shortUrl, url.title, url.url)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              setShowModal(true);
                              setDeleteId(url.shortUrl);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this URL?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListUrl;




// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar';

// function ListUrl() {
//   const [urls, setUrls] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingUrlId, setEditingUrlId] = useState(null);
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedUrl, setEditedUrl] = useState('');
//   const [error, setError] = useState('');

//   const ITEMS_PER_PAGE = 1; // Display one URL per page

//   // Fetch URLs from localStorage on component mount
//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       const userUrls = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
//       setUrls(userUrls);
//     } else {
//       setError('Please log in to view your URLs.');
//     }
//   }, []);

//   // Pagination calculations
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentUrls = urls.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(urls.length / ITEMS_PER_PAGE);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Edit functionality
//   const handleEdit = (id, currentTitle, currentUrl) => {
//     setEditingUrlId(id);
//     setEditedTitle(currentTitle);
//     setEditedUrl(currentUrl);
//   };

//   const handleSaveEdit = (id) => {
//     const updatedUrls = urls.map((url) =>
//       url.shortUrl === id
//         ? { ...url, title: editedTitle, url: editedUrl }
//         : url
//     );
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.username, JSON.stringify(updatedUrls));
//     }
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   const handleCancelEdit = () => {
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const updatedUrls = urls.filter((url) => url.shortUrl !== id);
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.username, JSON.stringify(updatedUrls));
//     }

//     // Adjust pagination after deleting the last URL on the current page
//     if (currentPage > 1 && updatedUrls.length / ITEMS_PER_PAGE < currentPage) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2 className="text-center">List of URLs</h2>
//         {error && <p className="text-danger">{error}</p>}

//         {currentUrls.length === 0 ? (
//           <p className="text-center">No URLs added yet.</p>
//         ) : (
//           <>
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>URL</th>
//                   <th>Short URL</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUrls.map((url) => (
//                   <tr key={url.shortUrl}>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedTitle}
//                           onChange={(e) => setEditedTitle(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         url.title
//                       )}
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedUrl}
//                           onChange={(e) => setEditedUrl(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         <a href={url.url} target="_blank" rel="noopener noreferrer">
//                           {url.url}
//                         </a>
//                       )}
//                     </td>
//                     <td>
//                       <a
//                         href={`/short/${url.shortUrl.split('/')[1]}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {url.shortUrl}
//                       </a>
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleSaveEdit(url.shortUrl)}
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="btn btn-secondary btn-sm"
//                             onClick={handleCancelEdit}
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             className="btn btn-primary btn-sm me-2"
//                             onClick={() =>
//                               handleEdit(url.shortUrl, url.title, url.url)
//                             }
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleDelete(url.shortUrl)}
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="d-flex justify-content-between">
//               <button
//                 className="btn btn-secondary"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-secondary"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default ListUrl;

// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar';

// function ListUrl() {
//   const [urls, setUrls] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingUrlId, setEditingUrlId] = useState(null);
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedUrl, setEditedUrl] = useState('');
//   const [error, setError] = useState('');

//   const ITEMS_PER_PAGE = 1; // Show one URL per page

//   // Fetch URLs from localStorage on component mount
//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       const userUrls = JSON.parse(localStorage.getItem(loggedInUser.id)) || [];
//       setUrls(userUrls);
//     } else {
//       setError('Please log in to view your URLs.');
//     }
//   }, []);

//   // Pagination calculations
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentUrls = urls.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(urls.length / ITEMS_PER_PAGE);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Edit functionality
//   const handleEdit = (id, currentTitle, currentUrl) => {
//     setEditingUrlId(id);
//     setEditedTitle(currentTitle);
//     setEditedUrl(currentUrl);
//   };

//   const handleSaveEdit = (id) => {
//     const updatedUrls = urls.map((url) =>
//       url.shortUrl === id
//         ? { ...url, title: editedTitle, url: editedUrl }
//         : url
//     );
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.id, JSON.stringify(updatedUrls));
//     }
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   const handleCancelEdit = () => {
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const updatedUrls = urls.filter((url) => url.shortUrl !== id);
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.id, JSON.stringify(updatedUrls));
//     }

//     // Adjust pagination after deleting the last URL on the current page
//     if (currentPage > 1 && updatedUrls.length / ITEMS_PER_PAGE < currentPage) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2 className="text-center">List of URLs</h2>
//         {error && <p className="text-danger">{error}</p>}

//         {currentUrls.length === 0 ? (
//           <p className="text-center">No URLs added yet.</p>
//         ) : (
//           <>
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>URL</th>
//                   <th>Short URL</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUrls.map((url) => (
//                   <tr key={url.shortUrl}>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedTitle}
//                           onChange={(e) => setEditedTitle(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         url.title
//                       )}
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedUrl}
//                           onChange={(e) => setEditedUrl(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         <a href={url.url} target="_blank" rel="noopener noreferrer">
//                           {url.url}
//                         </a>
//                       )}
//                     </td>
//                     <td>
//                       <a
//                         href={`/short/${url.shortUrl.split('/')[1]}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {url.shortUrl}
//                       </a>
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleSaveEdit(url.shortUrl)}
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="btn btn-secondary btn-sm"
//                             onClick={handleCancelEdit}
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             className="btn btn-primary btn-sm me-2"
//                             onClick={() =>
//                               handleEdit(url.shortUrl, url.title, url.url)
//                             }
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleDelete(url.shortUrl)}
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="d-flex justify-content-between">
//               <button
//                 className="btn btn-secondary"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-secondary"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default ListUrl;

// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar';

// function ListUrl() {
//   const [urls, setUrls] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingUrlId, setEditingUrlId] = useState(null);
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedUrl, setEditedUrl] = useState('');

//   const ITEMS_PER_PAGE = 1; // Show one URL per page

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       const userUrls = JSON.parse(localStorage.getItem(loggedInUser.id)) || [];
//       setUrls(userUrls);
//     }
//   }, []);

//   // Pagination calculations
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentUrls = urls.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(urls.length / ITEMS_PER_PAGE);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Edit functionality
//   const handleEdit = (id, currentTitle, currentUrl) => {
//     setEditingUrlId(id);
//     setEditedTitle(currentTitle);
//     setEditedUrl(currentUrl);
//   };

//   const handleSaveEdit = (id) => {
//     const updatedUrls = urls.map((url) =>
//       url.shortUrl === id
//         ? { ...url, title: editedTitle, url: editedUrl }
//         : url
//     );
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.id, JSON.stringify(updatedUrls));
//     }
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   const handleCancelEdit = () => {
//     setEditingUrlId(null);
//     setEditedTitle('');
//     setEditedUrl('');
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const updatedUrls = urls.filter((url) => url.shortUrl !== id);
//     setUrls(updatedUrls);
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//       localStorage.setItem(loggedInUser.id, JSON.stringify(updatedUrls));
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2 className="text-center">List of URLs</h2>
//         {currentUrls.length === 0 ? (
//           <p className="text-center">No URLs added yet.</p>
//         ) : (
//           <>
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>URL</th>
//                   <th>Short URL</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUrls.map((url) => (
//                   <tr key={url.shortUrl}>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedTitle}
//                           onChange={(e) => setEditedTitle(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         url.title
//                       )}
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <input
//                           type="text"
//                           value={editedUrl}
//                           onChange={(e) => setEditedUrl(e.target.value)}
//                           className="form-control"
//                         />
//                       ) : (
//                         <a href={url.url} target="_blank" rel="noopener noreferrer">
//                           {url.url}
//                         </a>
//                       )}
//                     </td>
//                     <td>
//                       <a
//                         href={`/short/${url.shortUrl.split('/')[1]}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {url.shortUrl}
//                       </a>
//                     </td>
//                     <td>
//                       {editingUrlId === url.shortUrl ? (
//                         <>
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleSaveEdit(url.shortUrl)}
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="btn btn-secondary btn-sm"
//                             onClick={handleCancelEdit}
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             className="btn btn-primary btn-sm me-2"
//                             onClick={() =>
//                               handleEdit(url.shortUrl, url.title, url.url)
//                             }
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm"
//                             onClick={() => handleDelete(url.shortUrl)}
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="d-flex justify-content-between">
//               <button
//                 className="btn btn-secondary"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-secondary"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default ListUrl;
