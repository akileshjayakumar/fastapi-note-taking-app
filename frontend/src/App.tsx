import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/notes/");
      setNotes(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch notes");
    }
    setLoading(false);
  };

  const handleAddNote = () => {
    setShowModal(true);
  };

  const addNote = async () => {
    if (!title || !content) {
      alert("Both title and content are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/notes/", {
        title,
        content,
      });
      setNotes([...notes, response.data]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      setError("Failed to add note");
    }
    setLoading(false);
    setShowModal(false);
  };

  const deleteNote = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete note");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>FastAPI Note Taking App</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button className="add-note-btn" onClick={handleAddNote}>
            Add New Note
          </button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="modal-input"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  className="modal-input"
                />
                <button onClick={addNote}>Submit Note</button>
              </div>
            </div>
          )}
          <div className="notes-container">
            {notes.map((note) => (
              <div key={note.id} className="note">
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
