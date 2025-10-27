require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const inquiryRoutes = require('./routes/inquiry.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

// connect db
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// health
app.get('/', (req, res) => res.send('ERP API running'));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
