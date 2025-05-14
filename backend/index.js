const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

connectDB();


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
