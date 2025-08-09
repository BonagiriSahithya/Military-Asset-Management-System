const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Logging middleware for debug (optional)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Your root route - MUST come BEFORE other routes
app.get('/', (req, res) => {
  res.send('Welcome to Military Asset Management System API');
});

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/transfers', require('./routes/transferRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/expenditures', require('./routes/expenditureRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// 404 handler (optional)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app;


