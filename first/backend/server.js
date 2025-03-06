// express server

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());



// By default, the cors middleware allows requests from all origins. You can customize it to allow only specific origins, methods, or headers.
// Example: Allow Only Specific Origins
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow only requests from this origin
//   methods: 'GET,POST', // Allow only GET and POST requests
//   allowedHeaders: 'Content-Type,Authorization', // Allow only specific headers
//   credentials: true, // Allow cookies and credentials
// };

// app.use(cors(corsOptions));

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});