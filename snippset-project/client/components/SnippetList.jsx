import { useState, useEffect } from 'react';
import { getSnippets, deleteSnippet } from '../api';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SnippetForm from './SnippetForm';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    getSnippets().then((res) => setSnippets(res.data));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this snippet?'
    );
    if (confirmDelete) {
      deleteSnippet(id)
        .then(() => {
          setSnippets(snippets.filter((s) => s.id !== id));
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
    // Refresh snippets after update
    getSnippets().then((res) => setSnippets(res.data));
    setIsEditing(false);
    setEditingSnippet(null);
  };

  return (
   
    <div className="">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="box-white">
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

          {/* Inline Edit Form for the current snippet */}
          {isEditing && editingSnippet?.id === snippet.id && (
            <div className="edit-inline">
              <SnippetForm
                editingSnippet={editingSnippet}
                onUpdated={handleUpdated}
              />
            </div>
          )}
        </div>
      ))}
      </div>
      
  );
}

export default SnippetList;
