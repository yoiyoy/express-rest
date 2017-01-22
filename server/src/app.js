import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

process.env.NODE_ENV === 'development'
  ? require('dotenv').config({ path: '.env_dev' })
  : require('dotenv').config({ path: '.env_prod' });

const app = express();
const port  = process.env.PORT;

// db connection
mongoose.connect(process.env.DB_CONNECTION);
mongoose.Promise = Promise;
// models used for mongoose
require('./models').default(mongoose);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./controllers').default);
app.use(require('./middlewares/errorHandler').default);

app.listen(port);
console.log(`server start on port ${port}`);

export default app;
