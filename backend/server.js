require('dotenv').config()

const app = require('./src/app.js')

const PORT = process.env.PORT || 3000


// Iniciar servidor de desarrollo
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

