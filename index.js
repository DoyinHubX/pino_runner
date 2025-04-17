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



// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/database');
// const productRoutes = require('./routes/productRoutes');
// const logger = require('./config/logger');
// const pinoHttp = require('pino-http');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// app.use(bodyParser.json());
// //app.use(pinoHttp({ logger }));
// app.use(
//   pinoHttp({
//     logger,
//     redact: ['req.headers.authorization', 'req.body.password'],
//   })
// );

// app.use('/api/products', productRoutes);


// app.listen(PORT, () => {
//   logger.info(`Server running on http://localhost:${PORT}`);
// }); 


// export default app; // Add this line



// // index.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import connectDB from './config/database.js';
// import productRoutes from './routes/productRoutes.js';
// import logger from './config/logger.js';
// import pinoHttp from 'pino-http';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(bodyParser.json());
// app.use(pinoHttp({ 
//   logger,
//   redact: ['req.headers.authorization', 'req.body.password']
// }));

// // Routes
// app.use('/api/products', productRoutes);

// app.listen(PORT, () => {
//   logger.info(`Server running on http://localhost:${PORT}`);
// });

// export default app;


import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import logger from './config/logger.js';
import pinoHttp from 'pino-http';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(pinoHttp({ 
  logger,
  redact: ['req.headers.authorization', 'req.body.password']
}));

// Routes
app.use('/api/products', productRoutes);

// Database connection and server start
let server;

const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
  return server;
};

// Export for testing
export { app, startServer };

// Start server unless in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}



