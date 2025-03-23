import { useState, useEffect } from 'react';
import { addSnippet, updateSnippet } from '../api';

function SnippetForm({ onAdded, editingSnippet, onUpdated }) {
    const [form, setForm] = useState({
        title: '',
        code: '',
        language: '',
        tags: ''
    });

    // Populate form with editingSnippet data if available
    useEffect(() => {
        if (editingSnippet) {
            setForm({
                title: editingSnippet.title,
                code: editingSnippet.code,
                language: editingSnippet.language,
                tags: editingSnippet.tags.join(', ') // Assuming tags is an array
            });
        }
    }, [editingSnippet]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!form.title || !form.code || !form.language) {
            alert("Please fill in all required fields");
            return;
        }

        const snippetData = {
            ...form,
            tags: form.tags.split(',').map(tag => tag.trim())
        };

        // If editing, update snippet; otherwise, add new snippet
        if (editingSnippet) {
            updateSnippet(editingSnippet.id, snippetData)
                .then(() => {
                    onUpdated();
                })
                .catch((error) => {
                    console.error('Error updating snippet:', error);
                    alert('There was an error updating the snippet.');
                });
        } else {
            addSnippet(snippetData)
                .then(() => {
                    onAdded();
                })
                .catch((error) => {
                    console.error('Error adding snippet:', error);
                    alert('There was an error adding the snippet.');
                });
        }
    };

    return (
        <form className="container-dark center"onSubmit={handleSubmit}>
  <input 
    name="title" 
    className="input-btn"
    placeholder="Title" 
    onChange={handleChange} 
    value={form.title} 
    required 
  />
  <textarea 
    name="code" 
    className="text-area"
    placeholder="Code" 
    onChange={handleChange} 
    value={form.code} 
    required 
  />
  <input 
    name="language" 
    className="input-btn"
    placeholder="Language" 
    onChange={handleChange} 
    value={form.language} 
    required 
  />
  <input 
    name="tags" 
    className="input-btn"
    placeholder="Tags (comma-separated)" 
    onChange={handleChange} 
    value={form.tags} 
  />
  <button type="submit" className="signUp-btn">
    {editingSnippet ? 'Update' : 'Save'}
  </button>
</form>
    );
}

export default SnippetForm;
