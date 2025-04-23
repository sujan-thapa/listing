import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);



  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/tasks');

      // Ensure the response data is an array
      // console.log(response.data)
      // if (Array.isArray(response.data)) {
      //   setTasks(response.data);
      // } else {
      //   throw new Error('Invalid data format: expected array');
      // }


      // Safely handle the response data
      const tasksData = response.data?.data || response.data || [];

      // Ensure all tasks have required properties
      const validatedTasks = tasksData.map(task => ({
        id: task.id || Date.now(), // fallback ID if missing
        title: task.title || 'Untitled Task',
        description: task.description || '',
        is_completed: Boolean(task.is_completed) // ensure boolean
      }));

      setTasks(validatedTasks);

    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setTasks([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };



  // to add tasks
  const addTask = async () => {

    // Ensure title is a string before calling trim()
    const taskTitle = String(title || '').trim();
    const taskDescription = description ? String(description).trim() : null;

    // basic validation
    // if(!title.trim()){
    //   setError("Task title is required");
    //   return;
    // }
    if (!taskTitle) {
      setError('Task title is required');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/addTasks', {
        title: title.trim(),
        description: description.trim() || null
      });

      // Add the new task to the beginning of the list
      // setTasks([response.data.data, ...tasks]);
      // this one is problematic because // Directly using response.data.data without validation


      // / Creating a validated new task object with fallbacks
      const newTask = {
        id: response.data?.data?.id || Date.now(),
        title: response.data?.data?.title || taskTitle,
        description: response.data?.data?.description || taskDescription,
        is_completed: Boolean(response.data?.data?.is_completed)
      };
      // console.log(response.data)
      // console.log(response.data.data)
      // console.log(response.data.data.id)

      // If the API returns { data: { data: [...] } } → response.data?.data


      setTasks([newTask, ...tasks]);


      // Clear the form
      setTitle('');
      setDescription('');

    } catch (err) {
      console.error('Create task error:', err);
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  }


   // UPDATE TASK FUNCTIONALITY
   const updateTask = async (taskId) => {
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, {
        title: title.trim(),
        description: description.trim() || null
      });

      const updatedTask = {
        id: taskId,
        title: response.data?.data?.title || title,
        description: response.data?.data?.description || description,
        is_completed: Boolean(response.data?.data?.is_completed)
      };

      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));

      setTitle('');
      setDescription('');
      setEditingTask(null);
    } catch (err) {
      console.error('Update task error:', err);
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };


  // DELETE TASK FUNCTIONALITY
  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Delete task error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  
 // TOGGLE TASK COMPLETION STATUS
 const toggleTaskStatus = async (taskId) => {
  try {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    const response = await axios.patch(`http://localhost:3000/api/tasks/${taskId}`, {
      is_completed: !taskToUpdate.is_completed
    });

    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, is_completed: !task.is_completed }
        : task
    ));
  } catch (err) {
    console.error('Toggle status error:', err);
    setError(err.response?.data?.message || 'Failed to update task status');
  }
};


  // SET TASK FOR EDITING
  const editTask = (task) => {
    setEditingTask(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // CANCEL EDITING
  const cancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };


  return (
    <div className="App">
      <h1>Task Manager</h1>

      {/* for adding tasks */}
      {error && <div className="error-message">{error}</div>}

      <div className="task-form">
        <input
          type="text"
          placeholder="Task title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        

        {editingTask ? (
          <>
          {/* {console.log(editingTask)} */}
            <button
              onClick={() => updateTask(editingTask)}
              disabled={loading || !title.trim()}
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
            <button onClick={cancelEdit} disabled={loading}>
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addTask}
            disabled={loading || !title.trim()}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        )}



        {/* <button
          onClick={addTask}
          disabled={loading || !title.trim()}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button> */}
      </div>

      {/* ... (your existing task list code) ... */}




      





      {/* for fetching tasks */}
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
              <div className="task-content">

                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-status">
                  Status: {task.is_completed ? 'Completed' : 'Pending'}
                </div>
              </div>

              <div className="task-actions">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="status-btn"
                >
                  {task.is_completed ? 'Mark Pending' : 'Mark Complete'}
                </button>

                <button
                  onClick={() => editTask(task)}
                  className="edit-btn"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className='delete-btn'
                >
                  Delete
                </button>
              </div>
            </div>

          ))
        )}
      </div>
    </div>
  );
}

export default App;