const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Entrez un nom'],
        trim: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Classe', classeSchema);