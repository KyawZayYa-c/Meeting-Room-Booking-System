const User = require('./src/models/user');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin',
            email: 'admin@meeting.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('✅ Admin user seeded successfully!');
    } else {
        console.log('ℹ️ Admin user already exists.');
    }
}

module.exports = seedAdmin;