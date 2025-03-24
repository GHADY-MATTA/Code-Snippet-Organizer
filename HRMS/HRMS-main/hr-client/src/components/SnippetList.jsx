import { useState, useEffect } from 'react';
import { getSnippets, deleteSnippet } from '../api';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SnippetForm from './SnippetForm';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    getSnippets().then((res) => setSnippets(res.data));
  }, []);

  const totalPages = Math.ceil(snippets.length / itemsPerPage);

  const paginatedSnippets = snippets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this snippet?'
    );
    if (confirmDelete) {
      deleteSnippet(id)
        .then(() => {
          const updated = snippets.filter((s) => s.id !== id);
          setSnippets(updated);
          // Adjust current page if needed
          const newTotalPages = Math.ceil(updated.length / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }
        })
        .catch((error) => {
          console.error('Error deleting snippet:', error);
        });
    }
  };

  const handleEditClick = (snippet) => {
    setIsEditing(true);
    setEditingSnippet(snippet);
  };

  const handleUpdated = () => {
    getSnippets().then((res) => {
      setSnippets(res.data);
      setIsEditing(false);
      setEditingSnippet(null);
      setCurrentPage(1); // Optional: reset to first page
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingSnippet(null);
  };

  return (
    <div className="p-4">
      {paginatedSnippets.map((snippet) => (
        <div key={snippet.id} className="box-white mb-6">
          <h3 className="h-tag">
            {snippet.title} ({snippet.language})
          </h3>
          <div>
            <SyntaxHighlighter
              language={snippet.language}
              style={docco}
              customStyle={{
                fontSize: '25px',
                padding: '20px',
                width: '90%',
                overflowX: 'auto',
              }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
          <button
            onClick={() => handleDelete(snippet.id)}
            className="back-btn"
          >
            Delete
          </button>
          <button onClick={() => handleEditClick(snippet)} className="btn-btn">
            Edit
          </button>

          {isEditing && editingSnippet?.id === snippet.id && (
            <div className="edit-inline mt-4">
              <SnippetForm
                editingSnippet={editingSnippet}
                onUpdated={handleUpdated}
              />
              <button
                onClick={handleCancelEdit}
                className="back-btn"
                style={{ marginTop: '10px' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      {snippets.length > itemsPerPage && (
        <div
          className="pagination-controls mt-6 flex items-center gap-4"
          style={{ marginTop: '30px' }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="back-btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SnippetList;
