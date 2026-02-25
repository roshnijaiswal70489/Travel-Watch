const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super_admin', 'hotel_admin'],
        default: 'hotel_admin',
    },
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
