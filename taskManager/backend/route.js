import express from 'express'
import pool from './db.js';



const app = express.Router();



// 
app.get('/tasks', async (req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM tasks RETURNING *');
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
})


app.post('/addTasks', async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
        [title, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//   to update the tasks
app.put('/task/:id', async (req, res)=>{
    const id = parseInt(req.params.id)
    // const {title, description} = req.body
    try {
        const result = await pool.query(
            'UPDATE tasks SET is_completed = true WHERE id = $1 RETURNING *',
            [id]
          );
          res.json(result.rows[0]);
        
    } catch (error) {
        console.error(err);
        res.status(500).send('Server error');
        
    }
})

// to delete the tasks
app.delete('/task/:id', async (req, res)=>{
    // const id = req.body.id
    // const {id} = req.body
    const id = parseInt(req.params.id)
    try {
        const response = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *', [id])
        // res.status(201).json(response.rows[0])

        if (response.rows.length === 0) {
            // No task with that ID
            return res.status(404).json({ error: 'Task not found' });
          }
      
          res.status(200).json({ message: 'Task deleted', task: response.rows[0] });
        
    } catch (error) {
        console.log(error)   
        res.status(500).json({message: "Could not find the data"});
    }
})

export default app