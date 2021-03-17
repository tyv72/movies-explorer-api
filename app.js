const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {
  sign, users, movies, all,
} = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { auth } = require('./middlewares/auth');
const rateLimitOpts = require('./config/rateLimitOpts');

const { PORT, DBADDRESS } = require('./config/envConfig');

mongoose.connect(DBADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(helmet());

app.set('trust proxy', 1);
const limiter = rateLimit(rateLimitOpts);
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(sign);
app.use(auth);
app.use(movies);
app.use(users);
app.use(all);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
