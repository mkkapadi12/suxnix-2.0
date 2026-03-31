require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const user_routes = require('./routes/user.routes');
const admin_routes = require('./routes/admin.routes');
const product_routes = require('./routes/product.routes');
const errorMiddleware = require('./middlewares/error.middleware');

//middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log(err));

//routes
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', (req, res) => res.send('API is working!'));

app.use('/api/auth/users', user_routes);
app.use('/api/auth/admin', admin_routes);
app.use('/api/products', product_routes);

//error handling middleware
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));
