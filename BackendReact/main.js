const app = require('./server');
// const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

//Connect Database;
// connectDB();

app.listen(port, function() {
  console.log(`Your server, listening on port ${port}`);
});
