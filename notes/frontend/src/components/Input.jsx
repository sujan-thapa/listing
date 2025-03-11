import React, {useState} from "react";

function Input({addNote}){
    const [inputValue, setInputValue] = useState("")

    // function to handle adddinga new note to the database
    const handleAddNote = (e)=>{
        e.preventDefault();
        if (inputValue.trim() !== "") {
            addNote(inputValue); //call the addnote function passed from the parent component
            setInputValue("");  //clear the input field
        }
    }

    return (
        <div className="form">
            <input type="text" 
            placeholder="Enter your notes" 
            value={inputValue}

            // update the input value as user types
            onChange={(e)=>setInputValue(e.target.value)}
            />
            <button type="submit" onClick={handleAddNote} >Add</button>
        </div>
    )
}

export default Input;