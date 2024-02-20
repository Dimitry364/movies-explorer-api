require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const cors = require('./middlewares/cors');
const { mongodb } = require('./utils/mongodb');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimit');

const { PORT = 3000, DB_CONN = mongodb } = process.env;
const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_CONN, {});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
