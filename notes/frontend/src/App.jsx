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


  return (
    <>
    <div className="container">
      <h2> To Do List</h2>
     <Input />
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
