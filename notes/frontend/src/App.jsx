import { useState, useEffect } from 'react'
import './App.css'
import Input from './components/Input'
import List from './components/List';

function App() {  
  const [notes, setNotes] = useState([]);

  // fetch notes from the API
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
    .then((response) => {
      console.log("Raw Response:", response); // Log the raw response object
      return response.json(); // Parse the response as JSON
    })
    // .then((response)=> console.log(response))
    // .then((response)=> response.json())


    // .then((data) => {
    //   console.log("Parsed Data:", data); // Log the parsed JSON data
    //   setNotes(data); // Update state with the parsed data
    // })
    .then((data)=>setNotes(data))
    .catch((error)=>console.error("Error fetching notes:", error));
  }, []);
  // console.log(notes)


  // function to add a new note
  const addNote = async (newNote) => {
    try {
      const response = await fetch("http://localhost:3000/api/notes",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({notes: newNote}) // Send the new note data
      })

      if (!response.ok) {
        throw new Error("Failed to save the note")
        
      }

      // Get the saved note from the response
      const savedNote = await response.json();

      // update the local state with the new note
      setNotes((prevNotes)=>[...prevNotes, savedNote]); // Avoid stale state by using prevNotes
      

      
    } catch (error) {
      console.error("Error saving the note:", error);
    }
  }



  return (
    <>
    <div className="container">
      <h2> To Do List</h2>
     <Input addNote={addNote} />
     <div className="toDoList">
      <ul>
          {notes.map((note) => (
        <li key={note.id}>
            <List 
              
              notes = {note.notes}
             />
        </li>
          ))}
      </ul>
     </div>

    </div>
    </>
  )
}

export default App
