require('dotenv').config()

const app = require('./src/app.js')

const PORT = process.env.PORT || 3000


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

