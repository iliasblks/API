const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Entrez un email.'],
        trim: true
    },
    password: {
        type: String,
        require: [true, 'Entrez un mot de passe.'],
        trim: true
    },
    firstname: {
        type: String,
        require: [true, 'Entrez un prénom.'],
        trim: true
    },
    lastname: {
        type: String,
        require: [true, 'Entrez un Nom.'],
        trim: true
    },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe'}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Student', studentSchema);