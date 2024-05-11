import React, { useState, useEffect } from "react";
import axios from "axios";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:8000/notes/");
    setNotes(response.data);
  };

  const addNote = async () => {
    const response = await axios.post("http://localhost:8000/notes/", {
      title,
      content,
    });
    setNotes([...notes, response.data]);
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id: number) => {
    await axios.delete(`http://localhost:8000/notes/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <button onClick={addNote}>Add Note</button>
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
