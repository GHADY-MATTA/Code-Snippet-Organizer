import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/snippets';

export const getSnippets = () => axios.get(API_URL);
export const getFavorites = () => axios.get(`${API_URL}/favorites`);
export const searchSnippets = (query) => axios.get(`${API_URL}/search?q=${query}`);
export const addSnippet = (data) => {
    console.log('Data being sent:', data);  // Log the data before sending the request
    return axios.post(API_URL, data);
};
export const updateSnippet = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSnippet = (id) => axios.delete(`${API_URL}/${id}`);
