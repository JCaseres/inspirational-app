import NotesList from "./components/NotesList";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Header from "./components/Header";
import Weather from "./components/WeatherApi";

const App = () => {

    const [notes, setNotes] = useState([
      {
        id: nanoid(),
        text: 'Meet with mom tomorrow for dinner at 8PM',
        date: "03/09/2023"
      },
      {
        id: nanoid(),
        text: 'Remember to call my Dr to change appointment',
        date: "03/10/2023"
      },
      {
        id: nanoid(),
        text: "Feed mom's dogs at 6pm",
        date: "03/11/2023"
      },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes)
      );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes)
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
        <br></br>
        <Weather />
      </div>
      
    </div>
  )
};

export default App;