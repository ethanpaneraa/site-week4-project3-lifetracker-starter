const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');
const { NotFoundError } = require("./utils/errors"); 
const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercise');


const app = express();
app.use(express.json());
app.use(cors()); 
app.use(morgan('dev'));

app.use("/auth", authRoutes); 

app.use("/exercise", exerciseRoutes);


// basic error handling route
app.use((req, res, next) => {
    return next(new NotFoundError());
})

// basic error handling route
// case: for when a route is not found or does not exist
app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({ error: { message, status }})
})

app.listen(PORT, () => {
    console.log(`🚀Server running on http://localhost:${PORT}`);
})
