import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch('http://localhost:5000/api/users')
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching users:', error));


    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));


    // fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching users:', error));



    // fetch('http://localhost:5000/api/users')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.text(); // First, read the response as text
    //   })
    //   .then((text) => {
    //     console.log('Response:', text); // Log the response
    //     return JSON.parse(text); // Try to parse it as JSON
    //   })
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;