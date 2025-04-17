// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/database');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// app.use(bodyParser.json());
// app.use('/api/products', productRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const logger = require('./config/logger');
const pinoHttp = require('pino-http');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
//app.use(pinoHttp({ logger }));
app.use(
  pinoHttp({
    logger,
    redact: ['req.headers.authorization', 'req.body.password'],
  })
);

app.use('/api/products', productRoutes);


app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
}); 