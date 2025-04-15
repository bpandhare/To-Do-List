import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8082/api/todos';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // Load tasks from backend on startup
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  const handleAdd = () => {
    if (task.trim() === '') return;

    const newTask = { task };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTask('');
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.list}>
        {todos.map((item) => (
          <li key={item.id} style={styles.listItem}>
            {item.task}
            <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  title: {
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    width: '70%',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    background: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '5px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
