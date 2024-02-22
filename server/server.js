const express = require('express');
require('dotenv').config()
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8001


app.use(express.json());
app.use(cors());

// app.use('/api/v1', authRoutes)
// app.use('/api/v1/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.json({"message": "Server is up 🚀"} )
})
// health api
app.get('/health', (req, res) => {
    res.json({"message": "Server is healthy 💪", signal: "🟢", status: 200 ,time:  new Date().toUTCString() } )
})

app.listen( PORT , (err) => { 
    if(!err) {
        console.log(` 🚀 Server is up on PORT http://localhost:${PORT}`)
    }
})