// Jai Shree Ram

const express = require('express');
const cors = require('cors');
const app = express();


const memUploadRoute = require("./api/memoryUpload")


// config dotenv
require("dotenv").config()

// cors handler
function corsHandler() {
    // Development environment
    if (process.env.NODE_ENV === 'dev') {
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        
    }
    // Production environment
    else {
        const allowedOrigins = [`https://${process.env.PROD_DOMAIN}`, `https://www.${process.env.PROD_DOMAIN}`];

        app.use(cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));
    }
}

corsHandler()

app.use("/api" , memUploadRoute)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

app.listen(process.env.PORT || 3000 , () => {
    console.log("App started listening on port 3000 at " + Date(Date.now()))
})