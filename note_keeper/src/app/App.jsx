import React, {useEffect, useState} from 'react';
import Note from "./note/Note.jsx";
import Footer from "./footer/Footer.jsx";
import NavBar from "./nav-bar/NavBar.jsx";
import CreateNoteCard from "./create-note-card/CreateNoteCard.jsx";

export default function App() {
    function fetchNotes() {
        fetch("http://localhost:3000/notes")
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error(error));
    }

    const [notes, setNotes] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    return <div className="outer-container">
        <NavBar/>
        <CreateNoteCard reloadCallback={fetchNotes} />
        <div className="notes-list">
            {(() => {
                switch (notes?.length) {
                    case undefined:
                        return <p>Loading...</p>
                    case 0:
                        return <p>No notes</p>
                    default:
                        return <ul>
                            {notes.map(note => <Note key={note.id} note={note} reloadCallback={fetchNotes}/>)}
                        </ul>
                }
            })()}
        </div>
        <Footer/>
    </div>;

}