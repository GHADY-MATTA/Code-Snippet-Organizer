import "./App.css";


import React from "react";
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';


const App = () => {
  return (
    <div className="App">
      <h1>Employee Clock-In/Out</h1>
      <SnippetList /> {/* Render the  component */}
      <br />
      <SnippetForm />
    </div>
  );
};

export default App;





