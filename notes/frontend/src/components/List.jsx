import React from "react"

function List(props){

    const handleDelete = (e)=>{
        e.preventDefault;
        props.deleteNote(props.id)

    }

    return (
        
        <p onClick={handleDelete}>{props.notes}</p>
    )
}

export default List