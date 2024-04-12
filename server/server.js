const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017';
const apiRouter = require('./routes/api.js');
const authController = require('./controllers/authController.js');

// connect to MongoDB
mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'practice'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

/**
* Automatically parse urlencoded body content and form data from incoming requests and place it
* in req.body
*/
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// serve static files
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));
app.get('/secret', authController.checkSession, (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/secret.html')));
// serve all static files in client
app.use('/client', express.static(path.resolve(__dirname, '../client/')));
// api routers to interract with backend
app.use('/api', apiRouter);

// error handlers
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

/**
 * start server
 */
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
module.exports = app;