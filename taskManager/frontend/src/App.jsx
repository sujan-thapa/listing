import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/tasks');
      
      // Ensure the response data is an array
      // console.log(response.data)
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        throw new Error('Invalid data format: expected array');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setTasks([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="App">
      <h1>Task Manager</h1>
      
      {/* Loading and error states */}
      {/* if loading is true that loading tasks will render */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {/* Task list */}
      <div className="task-list">
        {tasks.length === 0 && !loading ? (
          <p>No tasks found</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task ${task.is_completed ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-status">
                Status: {task.is_completed ? 'Completed' : 'Pending'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;