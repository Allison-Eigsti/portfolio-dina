require('dotenv').config()

const app = require('./src/app.js')
const connectDB = require('./src/config/db.js')

const PORT = process.env.PORT || 3000


// Connect to database
connectDB()


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


