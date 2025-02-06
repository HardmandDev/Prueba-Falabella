const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Routes
const routes = require('./routes/authRoutes.js')

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));

// Body parse configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes configuration
app.use('/api/v1/', routes);

app.get('/', (req, res) => {
    return res.json({ message: 'testeando auth-service...' })
});

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message });
});

// Server initialization
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});