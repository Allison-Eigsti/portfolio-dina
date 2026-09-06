require('dotenv').config()

const bcrypt = require('bcrypt')
const connectDB = require('./src/config/db.js')
const User = require('./src/models/User.js')

const seedAdmin = async () => {
    try {
        await connectDB()

        const existingUser = await User.findOne({
            email: process.env.ADMIN_EMAIL
        })

        if (existingUser) {
            console.log('Admin user already exists')
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        )

        const user = await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin'
        })

        console.log(`Admin user created: ${user.email}`)

        process.exit(0)
    } catch (error) {
        console.error('Error seeding admin:', error)
        process.exit(1)
    }
}

seedAdmin()